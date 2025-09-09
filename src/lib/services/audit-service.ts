import { prisma } from "@/lib/prisma";

export interface AuditLogEntry {
  id: string;
  orderId?: string;
  action: string;
  oldValue?: string;
  newValue?: string;
  userId?: string;
  createdAt: Date;
}

export class AuditService {
  async logAction(
    action: string,
    options: {
      orderId?: string;
      userId?: string;
      oldValue?: any;
      newValue?: any;
    } = {}
  ): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          action,
          orderId: options.orderId,
          userId: options.userId,
          oldValue: options.oldValue ? JSON.stringify(options.oldValue) : null,
          newValue: options.newValue ? JSON.stringify(options.newValue) : null,
        },
      });
    } catch (error) {
      console.error("Failed to create audit log:", error);
      // Don't throw error to avoid breaking the main operation
    }
  }

  async logOrderStatusChange(
    orderId: string,
    oldStatus: string,
    newStatus: string,
    userId?: string
  ): Promise<void> {
    await this.logAction("ORDER_STATUS_CHANGED", {
      orderId,
      userId,
      oldValue: { status: oldStatus },
      newValue: { status: newStatus },
    });
  }

  async logPaymentStatusChange(
    orderId: string,
    oldStatus: string,
    newStatus: string,
    userId?: string
  ): Promise<void> {
    await this.logAction("PAYMENT_STATUS_CHANGED", {
      orderId,
      userId,
      oldValue: { paymentStatus: oldStatus },
      newValue: { paymentStatus: newStatus },
    });
  }

  async logCodPaymentConfirmation(
    orderId: string,
    userId: string
  ): Promise<void> {
    await this.logAction("COD_PAYMENT_CONFIRMED", {
      orderId,
      userId,
      newValue: { confirmed: true, timestamp: new Date().toISOString() },
    });
  }

  async logItemCreated(
    itemId: string,
    itemData: any,
    userId?: string
  ): Promise<void> {
    await this.logAction("ITEM_CREATED", {
      userId,
      newValue: { itemId, ...itemData },
    });
  }

  async logItemUpdated(
    itemId: string,
    oldData: any,
    newData: any,
    userId?: string
  ): Promise<void> {
    await this.logAction("ITEM_UPDATED", {
      userId,
      oldValue: { itemId, ...oldData },
      newValue: { itemId, ...newData },
    });
  }

  async logItemDeleted(
    itemId: string,
    itemData: any,
    userId?: string
  ): Promise<void> {
    await this.logAction("ITEM_DELETED", {
      userId,
      oldValue: { itemId, ...itemData },
    });
  }

  async logCategoryCreated(
    categoryId: string,
    categoryData: any,
    userId?: string
  ): Promise<void> {
    await this.logAction("CATEGORY_CREATED", {
      userId,
      newValue: { categoryId, ...categoryData },
    });
  }

  async logCategoryUpdated(
    categoryId: string,
    oldData: any,
    newData: any,
    userId?: string
  ): Promise<void> {
    await this.logAction("CATEGORY_UPDATED", {
      userId,
      oldValue: { categoryId, ...oldData },
      newValue: { categoryId, ...newData },
    });
  }

  async logCategoryDeleted(
    categoryId: string,
    categoryData: any,
    userId?: string
  ): Promise<void> {
    await this.logAction("CATEGORY_DELETED", {
      userId,
      oldValue: { categoryId, ...categoryData },
    });
  }

  async logExpenseCreated(
    expenseId: string,
    expenseData: any,
    userId?: string
  ): Promise<void> {
    await this.logAction("EXPENSE_CREATED", {
      userId,
      newValue: { expenseId, ...expenseData },
    });
  }

  async logExpenseUpdated(
    expenseId: string,
    oldData: any,
    newData: any,
    userId?: string
  ): Promise<void> {
    await this.logAction("EXPENSE_UPDATED", {
      userId,
      oldValue: { expenseId, ...oldData },
      newValue: { expenseId, ...newData },
    });
  }

  async logExpenseDeleted(
    expenseId: string,
    expenseData: any,
    userId?: string
  ): Promise<void> {
    await this.logAction("EXPENSE_DELETED", {
      userId,
      oldValue: { expenseId, ...expenseData },
    });
  }

  async logSettingsUpdated(settingsData: any, userId?: string): Promise<void> {
    await this.logAction("SETTINGS_UPDATED", {
      userId,
      newValue: settingsData,
    });
  }

  async getAuditLogs(
    orderId?: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<AuditLogEntry[]> {
    const logs = await prisma.auditLog.findMany({
      where: orderId ? { orderId } : undefined,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    return logs;
  }
}
