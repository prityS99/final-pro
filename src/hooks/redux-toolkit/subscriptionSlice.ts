import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createInvoiceTs } from '@/lib/createInvoicePdf';

interface Member {
  $id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  plan: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  startDate: string;
  expiryDate: string;
}

interface SubState {
  loading: boolean;
  error: string | null;
  subscriptionData: any | null;
  invoice: any | null;
  members: Member[];
  membersLoading: boolean;
  membersError: string | null;
}

const initialState: SubState = {
  loading: false,
  error: null,
  subscriptionData: null,
  invoice: null,
  members: [],
  membersLoading: false,
  membersError: null,
};

// 🟢 PAYMENT THUNKS (Your original - unchanged)
export const createOrder = createAsyncThunk(
  'subscription/createOrder',
  async (payload: { amount: number; user: any; planName: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/subscription/create-order', payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Order creation failed');
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'subscription/verifyPayment',
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/subscription/verify-payment', data);

      const invoice = createInvoiceTs({
        userId: data.userId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        planName: data.planName,
        planPrice: data.planPrice,
        paymentId: data.paymentId,
        orderId: data.orderId,
        subscriptionDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });

      return { invoice, db: res.data };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Verification failed');
    }
  }
);

// 🟢 MEMBERS THUNKS (Fixed for Appwrite data)
export const fetchMembers = createAsyncThunk(
  'subscription/fetchMembers',
  async ({ workspaceId, status }: { workspaceId?: string; status?: string }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (workspaceId) params.append('workspaceId', workspaceId);
      if (status) params.append('status', status);
      
      const res = await axios.get(`/api/admin/members?${params}`);
      
      // ✅ Transform Appwrite response (handles existing + new members)
      const members: Member[] = (res.data.documents || res.data).map((doc: any) => ({
        $id: doc.$id,
        userId: doc.userId || doc.email || doc.$id,
        name: doc.name || 'Unknown User',
        email: doc.email || doc.userId || 'N/A',
        phone: doc.phone || '',
        plan: doc.plan || doc.subscriptionPlan || 'basic',
        status: (doc.status as any) || 'active',
        startDate: doc.startDate || doc.$createdAt || new Date().toISOString(),
        expiryDate: doc.expiryDate || doc.expiresAt || '',
      }));
      
      return members;
    } catch (err: any) {
      console.error('Fetch members error:', err);
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch members');
    }
  }
);

export const addMember = createAsyncThunk(
  'subscription/addMember',
  async (memberData: { email: string; name: string; plan: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/admin/users', memberData);
      // Transform single Appwrite document
      const member: Member = {
        $id: res.data.$id,
        userId: res.data.userId || memberData.email,
        name: res.data.name || memberData.name,
        email: res.data.email || memberData.email,
        phone: res.data.phone || '',
        plan: res.data.plan || memberData.plan,
        status: res.data.status || 'active',
        startDate: res.data.startDate || res.data.$createdAt || new Date().toISOString(),
        expiryDate: res.data.expiryDate || '',
      };
      return member;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add member');
    }
  }
);

export const updateMemberStatus = createAsyncThunk(
  'subscription/updateMemberStatus',
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/api/admin/users/${id}`, { status });
      return {
        $id: id,
        status: res.data.status || status,
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update member');
    }
  }
);

export const deleteMember = createAsyncThunk(
  'subscription/deleteMember',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete member');
    }
  }
);

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.membersError = null;
    },
    clearSubscriptionData: (state) => {
      state.subscriptionData = null;
      state.invoice = null;
    },
    clearMembers: (state) => {
      state.members = [];
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟢 CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptionData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🟢 VERIFY PAYMENT
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice = action.payload.invoice;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🟢 FETCH MEMBERS (Fixed for Appwrite)
      .addCase(fetchMembers.pending, (state) => {
        state.membersLoading = true;
        state.membersError = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.membersLoading = false;
        state.members = action.payload; // Already transformed in thunk
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.membersLoading = false;
        state.membersError = action.payload as string;
      })

      // 🟢 ADD MEMBER
      .addCase(addMember.pending, (state) => {
        state.membersLoading = true;
        state.membersError = null;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.membersLoading = false;
        state.members.unshift(action.payload); // Add to top
      })
      .addCase(addMember.rejected, (state, action) => {
        state.membersLoading = false;
        state.membersError = action.payload as string;
      })

      // 🟢 UPDATE MEMBER STATUS
      .addCase(updateMemberStatus.fulfilled, (state, action) => {
        const index = state.members.findIndex((m) => m.$id === action.payload.$id);
        if (index !== -1) {
          state.members[index] = { ...state.members[index], ...action.payload };
        }
      })

      // 🟢 DELETE MEMBER
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.members = state.members.filter((m) => m.$id !== action.payload);
      });
  },
});

export const { clearError, clearSubscriptionData, clearMembers, setMembers } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
