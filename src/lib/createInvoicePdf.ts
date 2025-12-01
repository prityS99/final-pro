export interface InvoiceData {
  invoiceId: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  planName: string;
  planPrice: number;
  paymentId: string;
  orderId: string;
  subscriptionDate: string;
  expiryDate: string;
  generatedOn: string;
  status: string;
}

// Generate invoice number like: INV-2025-000123
function generateInvoiceId() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `INV-${year}-${random}`;
}

export function createInvoiceTs(input: Partial<InvoiceData>): InvoiceData {
  return {
    invoiceId: generateInvoiceId(),
    userId: input.userId!,
    name: input.name!,
    email: input.email!,
    phone: input.phone!,
    planName: input.planName!,
    planPrice: Number(input.planPrice!),
    paymentId: input.paymentId!,
    orderId: input.orderId!,
    subscriptionDate: input.subscriptionDate!,
    expiryDate: input.expiryDate!,
    generatedOn: new Date().toISOString(),
    status: "active",
  };
}
