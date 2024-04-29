import { PrismaClient } from '@prisma/client';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

const prisma = new PrismaClient();

export async function fetchRevenue(): Promise<Revenue[]> {
  try {
    const data = await prisma.revenue.findMany({select: {month: true, revenue: true}});
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices(): Promise<LatestInvoiceRaw> {
  try {
    const data = await prisma.invoices.findMany({
      include: {
        customers: true,
      },
      orderBy: {
        date: 'desc'
      },
      take: 5
    });

    const latestInvoices = data.map(invoice => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));

    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    const invoiceCount = await prisma.invoices.count();
    const customerCount = await prisma.customers.count();
    const invoiceStatus = await prisma.invoices.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: {
          equals: 'paid',
        },
      },
    });

    return {
      numberOfCustomers: customerCount,
      numberOfInvoices: invoiceCount,
      totalPaidInvoices: formatCurrency(invoiceStatus._sum.amount || 0),
      // Assuming handling for pending similar to paid
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  let numQuery = parseInt(query); // Example conversion, handle parsing errors appropriately
  let dateQuery = new Date(query); // Similar handling for date

  try {
    const invoices = await prisma.invoices.findMany({
      where: {
        OR: [
          { customer: { name: { contains: query, mode: 'insensitive' } } },
          { customer: { email: { contains: query, mode: 'insensitive' } } },
          { amount: numQuery ? { equals: numQuery } : undefined },
          // For date, you would typically filter for a range or exact match, not contains
          { status: { contains: query, mode: 'insensitive' } },
        ].filter(Boolean), // This removes any undefined entries which might result from invalid conversions
      },
      orderBy: {
        date: 'desc'
      },
      skip: offset,
      take: ITEMS_PER_PAGE
    });

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await prisma.invoices.count({
      where: {
        OR: [
          { customers: { name: { contains: query } } },
          { customers: { email: { contains: query } } },
          { amount: { equals: parseFloat(query) } },
          { status: { contains: query } }
        ]
      }
    });
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const invoice = await prisma.invoices.findUnique({
      where: { id },
      include: {
        customers: true
      }
    });

    return invoice ? { ...invoice, amount: invoice.amount / 100 } : null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await prisma.customers.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return customers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const customers = await prisma.customers.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { email: { contains: query } }
        ]
      },
      include: {
        invoices: true
      }
    });

    return customers.map(customer => ({
      ...customer,
      total_pending: customer.invoices.reduce((acc, curr) => curr.status === 'pending' ? acc + curr.amount : acc, 0),
      total_paid: customer.invoices.reduce((acc, curr) => curr.status === 'paid' ? acc + curr.amount : acc, 0),
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await prisma.users.findUnique({
      where: { email }
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
