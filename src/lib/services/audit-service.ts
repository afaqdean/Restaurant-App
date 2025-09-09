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
      oldValue?: string;
      newValue?: string;
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
      oldValue: oldStatus,
      newValue: newStatus,
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
      oldValue: oldStatus,
      newValue: newStatus,
    });
  }

  async logCodPaymentConfirmation(
    orderId: string,
    userId: string
  ): Promise<void> {
    await this.logAction("COD_PAYMENT_CONFIRMED", {
      orderId,
      userId,
      newValue: `Confirmed at ${new Date().toISOString()}`,
    });
  }

  async logItemCreated(
    itemId: string,
    itemData: string,
    userId?: string
  ): Promise<void> {
    await this.logAction("ITEM_CREATED", {
      userId,
      newValue: itemData,
    });
  }

  async logItemUpdated(
    itemId: string,
    oldData: string,
    newData: string,
    userId?: string
  ): Promise<void> {
    await this.logAction("ITEM_UPDATED", {
      userId,
      oldValue: oldData,
      newValue: newData,
    });
  }

  async logItemDeleted(
    itemId: string,
    itemData: string,
    userId?: string
  ): Promise<void> {
    await this.logAction("ITEM_DELETED", {
      userId,
      oldValue: itemData,
    });
  }

  async logCategoryCreated(
    categoryId: string,
    categoryData: string,
    userId?: string
  ): Promise<void> {
    await this.logAction("CATEGORY_CREATED", {
      userId,
      newValue: categoryData,
    });
  }

  async logCategoryUpdated(
    categoryId: string,
    oldData: string,
    newData: string,
    userId?: string
  ): Promise<void> {
    await this.logAction("CATEGORY_UPDATED", {
      userId,
      oldValue: oldData,
      newValue: newData,
    });
  }

  async logCategoryDeleted(
    categoryId: string,
    categoryData: string,
    userId?: string
  ): Promise<void> {
    await this.logAction("CATEGORY_DELETED", {
      userId,
      oldValue: categoryData,
    });
  }

  async logExpenseCreated(
    expenseId: string,
    expenseData: string,
    userId?: string
  ): Promise<void> {
    await this.logAction("EXPENSE_CREATED", {
      userId,
      newValue: expenseData,
    });
  }

  async logExpenseUpdated(
    expenseId: string,
    oldData: string,
    newData: string,
    userId?: string
  ): Promise<void> {
    await this.logAction("EXPENSE_UPDATED", {
      userId,
      oldValue: oldData,
      newValue: newData,
    });
  }

  async logExpenseDeleted(
    expenseId: string,
    expenseData: string,
    userId?: string
  ): Promise<void> {
    await this.logAction("EXPENSE_DELETED", {
      userId,
      oldValue: expenseData,
    });
  }

  async logSettingsUpdated(
    settingsData: string,
    userId?: string
  ): Promise<void> {
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

    return logs.map((log) => ({
      id: log.id,
      orderId: log.orderId || undefined,
      action: log.action,
      oldValue: log.oldValue || undefined,
      newValue: log.newValue || undefined,
      userId: log.userId || undefined,
      createdAt: log.createdAt,
    }));
  }
}
