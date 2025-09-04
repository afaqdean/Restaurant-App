import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data (in reverse dependency order)
  await prisma.auditLog.deleteMany();
  await prisma.orderItemOption.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.itemOption.deleteMany();
  await prisma.itemOptionGroup.deleteMany();
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.settings.deleteMany();

  // 1. Create Users
  console.log("Creating users...");
  const adminPassword = await bcrypt.hash("admin123", 10);
  const customerPassword = await bcrypt.hash("customer123", 10);

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@deliciousbites.com",
      password: adminPassword,
      name: "Admin User",
      role: "ADMIN",
      phone: "+1 (555) 123-4567",
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      email: "customer@example.com",
      password: customerPassword,
      name: "John Doe",
      role: "CUSTOMER",
      phone: "+1 (555) 987-6543",
    },
  });

  // 2. Create Categories
  console.log("Creating categories...");
  const appetizersCategory = await prisma.category.create({
    data: {
      name: "Appetizers",
      description: "Start your meal with our delicious appetizers",
      image:
        "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=800",
      sortOrder: 1,
      active: true,
    },
  });

  const mainCourseCategory = await prisma.category.create({
    data: {
      name: "Main Course",
      description: "Hearty and satisfying main dishes",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
      sortOrder: 2,
      active: true,
    },
  });

  const dessertsCategory = await prisma.category.create({
    data: {
      name: "Desserts",
      description: "Sweet treats to end your meal perfectly",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800",
      sortOrder: 3,
      active: true,
    },
  });

  // 3. Create Items with Options
  console.log("Creating menu items...");

  // Appetizers
  await prisma.item.create({
    data: {
      name: "Crispy Spring Rolls",
      description:
        "Fresh vegetables wrapped in crispy pastry, served with sweet chili sauce",
      price: 899, // $8.99
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800",
      categoryId: appetizersCategory.id,
      active: true,
    },
  });

  await prisma.item.create({
    data: {
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter and herbs",
      price: 599, // $5.99
      image:
        "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=800",
      categoryId: appetizersCategory.id,
      active: true,
    },
  });

  const wingsItem = await prisma.item.create({
    data: {
      name: "Buffalo Wings",
      description: "Crispy chicken wings tossed in buffalo sauce",
      price: 1299, // $12.99
      image:
        "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800",
      categoryId: appetizersCategory.id,
      active: true,
    },
  });

  // Add wings sauce options
  const wingsFlavorGroup = await prisma.itemOptionGroup.create({
    data: {
      name: "Sauce",
      itemId: wingsItem.id,
      required: true,
      multiple: false,
    },
  });

  await prisma.itemOption.create({
    data: {
      name: "Buffalo",
      price: 0,
      groupId: wingsFlavorGroup.id,
    },
  });

  await prisma.itemOption.create({
    data: {
      name: "BBQ",
      price: 0,
      groupId: wingsFlavorGroup.id,
    },
  });

  await prisma.itemOption.create({
    data: {
      name: "Honey Garlic",
      price: 50, // $0.50 extra
      groupId: wingsFlavorGroup.id,
    },
  });

  const calamariItem = await prisma.item.create({
    data: {
      name: "Fried Calamari",
      description: "Tender squid rings with marinara sauce",
      price: 1499, // $14.99
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800",
      categoryId: appetizersCategory.id,
      active: true,
    },
  });

  // Main Course Items
  const burgerItem = await prisma.item.create({
    data: {
      name: "Classic Cheeseburger",
      description:
        "Beef patty with cheese, lettuce, tomato, and our special sauce",
      price: 1599, // $15.99
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
      categoryId: mainCourseCategory.id,
      active: true,
    },
  });

  // Add burger customization options
  const burgerSizeGroup = await prisma.itemOptionGroup.create({
    data: {
      name: "Size",
      itemId: burgerItem.id,
      required: true,
      multiple: false,
    },
  });

  await prisma.itemOption.create({
    data: {
      name: "Regular",
      price: 0,
      groupId: burgerSizeGroup.id,
    },
  });

  await prisma.itemOption.create({
    data: {
      name: "Large",
      price: 300, // $3.00 extra
      groupId: burgerSizeGroup.id,
    },
  });

  const burgerExtrasGroup = await prisma.itemOptionGroup.create({
    data: {
      name: "Add-ons",
      itemId: burgerItem.id,
      required: false,
      multiple: true,
    },
  });

  await prisma.itemOption.create({
    data: {
      name: "Extra Cheese",
      price: 150, // $1.50
      groupId: burgerExtrasGroup.id,
    },
  });

  await prisma.itemOption.create({
    data: {
      name: "Bacon",
      price: 250, // $2.50
      groupId: burgerExtrasGroup.id,
    },
  });

  await prisma.itemOption.create({
    data: {
      name: "Avocado",
      price: 200, // $2.00
      groupId: burgerExtrasGroup.id,
    },
  });

  const pizzaItem = await prisma.item.create({
    data: {
      name: "Margherita Pizza",
      description: "Fresh mozzarella, tomatoes, and basil on crispy crust",
      price: 1899, // $18.99
      image:
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800",
      categoryId: mainCourseCategory.id,
      active: true,
    },
  });

  const steakItem = await prisma.item.create({
    data: {
      name: "Grilled Ribeye Steak",
      description:
        "12oz ribeye steak grilled to perfection with mashed potatoes",
      price: 3299, // $32.99
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
      categoryId: mainCourseCategory.id,
      active: true,
    },
  });

  const pastaItem = await prisma.item.create({
    data: {
      name: "Chicken Alfredo Pasta",
      description:
        "Fettuccine pasta with grilled chicken in creamy alfredo sauce",
      price: 1999, // $19.99
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800",
      categoryId: mainCourseCategory.id,
      active: true,
    },
  });

  // Desserts
  const chocolateCakeItem = await prisma.item.create({
    data: {
      name: "Chocolate Lava Cake",
      description:
        "Warm chocolate cake with molten center, served with vanilla ice cream",
      price: 899, // $8.99
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",
      categoryId: dessertsCategory.id,
      active: true,
    },
  });

  await prisma.item.create({
    data: {
      name: "New York Cheesecake",
      description: "Classic creamy cheesecake with graham cracker crust",
      price: 799, // $7.99
      image:
        "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800",
      categoryId: dessertsCategory.id,
      active: true,
    },
  });

  await prisma.item.create({
    data: {
      name: "Tiramisu",
      description: "Traditional Italian dessert with coffee-soaked ladyfingers",
      price: 999, // $9.99
      image:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800",
      categoryId: dessertsCategory.id,
      active: true,
    },
  });

  const iceCreamItem = await prisma.item.create({
    data: {
      name: "Artisan Ice Cream",
      description: "Three scoops of our homemade ice cream",
      price: 699, // $6.99
      image:
        "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800",
      categoryId: dessertsCategory.id,
      active: true,
    },
  });

  // 4. Create Coupons
  console.log("Creating coupons...");
  await prisma.coupon.create({
    data: {
      code: "WELCOME10",
      type: "PERCENTAGE",
      value: 10, // 10% discount
      minAmount: 2000, // $20.00 minimum
      maxUses: 100,
      currentUses: 12,
      active: true,
      expiresAt: new Date("2025-12-31"),
    },
  });

  await prisma.coupon.create({
    data: {
      code: "SAVE5",
      type: "FIXED",
      value: 500, // $5.00 discount
      minAmount: 2500, // $25.00 minimum
      maxUses: 50,
      currentUses: 7,
      active: true,
      expiresAt: new Date("2025-11-30"),
    },
  });

  await prisma.coupon.create({
    data: {
      code: "BIGORDER",
      type: "PERCENTAGE",
      value: 15, // 15% discount
      minAmount: 5000, // $50.00 minimum
      maxUses: 25,
      currentUses: 3,
      active: true,
      expiresAt: new Date("2025-10-31"),
    },
  });

  // 5. Create Sample Orders
  console.log("Creating sample orders...");

  // Order 1 - Stripe payment, completed
  const order1 = await prisma.order.create({
    data: {
      orderNumber: "ORD-001",
      customerId: customerUser.id,
      customerName: "John Doe",
      customerEmail: "customer@example.com",
      customerPhone: "+1 (555) 987-6543",
      status: "COMPLETED",
      paymentMethod: "CARD",
      paymentStatus: "PAID",
      subtotal: 2797, // $27.97
      tax: 238, // 8.5% tax
      serviceFee: 84, // 3% service fee
      discount: 280, // WELCOME10 discount
      total: 2839, // $28.39
      notes: "Please make it spicy!",
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      itemId: burgerItem.id,
      quantity: 1,
      price: 1849, // with large size (+$3) and bacon (+$2.50)
      notes: "No pickles",
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      itemId: wingsItem.id,
      quantity: 1,
      price: 1299,
    },
  });

  await prisma.payment.create({
    data: {
      orderId: order1.id,
      provider: "STRIPE",
      amount: 2839,
      status: "PAID",
      stripePaymentId: "pi_test_1234567890",
      metadata: { stripe_payment_intent: "pi_test_1234567890" },
    },
  });

  // Order 2 - COD payment, pending
  const order2 = await prisma.order.create({
    data: {
      orderNumber: "ORD-002",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      customerPhone: "+1 (555) 123-9876",
      status: "PENDING",
      paymentMethod: "COD",
      paymentStatus: "UNPAID",
      subtotal: 1899, // $18.99
      tax: 161, // 8.5% tax
      serviceFee: 57, // 3% service fee
      discount: 0,
      total: 2117, // $21.17
      notes: "Extra cheese please",
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      itemId: pizzaItem.id,
      quantity: 1,
      price: 1899,
    },
  });

  await prisma.payment.create({
    data: {
      orderId: order2.id,
      provider: "COD",
      amount: 2117,
      status: "UNPAID",
    },
  });

  // Order 3 - Stripe payment, in kitchen
  const order3 = await prisma.order.create({
    data: {
      orderNumber: "ORD-003",
      customerId: customerUser.id,
      customerName: "John Doe",
      customerEmail: "customer@example.com",
      customerPhone: "+1 (555) 987-6543",
      status: "IN_KITCHEN",
      paymentMethod: "CARD",
      paymentStatus: "PAID",
      subtotal: 4198, // $41.98
      tax: 357, // 8.5% tax
      serviceFee: 126, // 3% service fee
      discount: 500, // SAVE5 coupon
      total: 4181, // $41.81
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order3.id,
      itemId: steakItem.id,
      quantity: 1,
      price: 3299,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order3.id,
      itemId: chocolateCakeItem.id,
      quantity: 1,
      price: 899,
    },
  });

  await prisma.payment.create({
    data: {
      orderId: order3.id,
      provider: "STRIPE",
      amount: 4181,
      status: "PAID",
      stripePaymentId: "pi_test_0987654321",
      metadata: { stripe_payment_intent: "pi_test_0987654321" },
    },
  });

  // Order 4 - COD payment, completed and paid
  const order4 = await prisma.order.create({
    data: {
      orderNumber: "ORD-004",
      customerName: "Mike Johnson",
      customerEmail: "mike@example.com",
      customerPhone: "+1 (555) 456-7890",
      status: "COMPLETED",
      paymentMethod: "COD",
      paymentStatus: "PAID",
      subtotal: 2698, // $26.98
      tax: 229, // 8.5% tax
      serviceFee: 81, // 3% service fee
      discount: 0,
      total: 3008, // $30.08
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order4.id,
      itemId: pastaItem.id,
      quantity: 1,
      price: 1999,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order4.id,
      itemId: iceCreamItem.id,
      quantity: 1,
      price: 699,
    },
  });

  await prisma.payment.create({
    data: {
      orderId: order4.id,
      provider: "COD",
      amount: 3008,
      status: "PAID",
    },
  });

  // Order 5 - Stripe payment, ready for pickup
  const order5 = await prisma.order.create({
    data: {
      orderNumber: "ORD-005",
      customerName: "Sarah Wilson",
      customerEmail: "sarah@example.com",
      customerPhone: "+1 (555) 321-0987",
      status: "READY",
      paymentMethod: "CARD",
      paymentStatus: "PAID",
      subtotal: 1498, // $14.98
      tax: 127, // 8.5% tax
      serviceFee: 45, // 3% service fee
      discount: 0,
      total: 1670, // $16.70
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order5.id,
      itemId: calamariItem.id,
      quantity: 1,
      price: 1499,
    },
  });

  await prisma.payment.create({
    data: {
      orderId: order5.id,
      provider: "STRIPE",
      amount: 1670,
      status: "PAID",
      stripePaymentId: "pi_test_5555555555",
      metadata: { stripe_payment_intent: "pi_test_5555555555" },
    },
  });

  // 6. Create Sample Expenses
  console.log("Creating sample expenses...");
  await prisma.expense.create({
    data: {
      category: "FOOD",
      vendor: "Fresh Produce Suppliers",
      amount: 45000, // $450.00
      description: "Weekly vegetable and meat supplies",
      receipt: "https://example.com/receipts/receipt-001.pdf",
      paid: true,
      paidAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.expense.create({
    data: {
      category: "UTILITIES",
      vendor: "City Electric Company",
      amount: 28000, // $280.00
      description: "Monthly electricity bill",
      receipt: "https://example.com/receipts/receipt-002.pdf",
      paid: true,
      paidAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.expense.create({
    data: {
      category: "MARKETING",
      vendor: "Social Media Ads Inc",
      amount: 15000, // $150.00
      description: "Facebook and Instagram advertising campaign",
      paid: false,
    },
  });

  // 7. Create Audit Logs for order status changes
  console.log("Creating audit logs...");
  await prisma.auditLog.create({
    data: {
      orderId: order1.id,
      action: "STATUS_CHANGE",
      oldValue: "PENDING",
      newValue: "ACCEPTED",
      userId: adminUser.id,
    },
  });

  await prisma.auditLog.create({
    data: {
      orderId: order1.id,
      action: "STATUS_CHANGE",
      oldValue: "ACCEPTED",
      newValue: "IN_KITCHEN",
      userId: adminUser.id,
    },
  });

  await prisma.auditLog.create({
    data: {
      orderId: order1.id,
      action: "STATUS_CHANGE",
      oldValue: "IN_KITCHEN",
      newValue: "READY",
      userId: adminUser.id,
    },
  });

  await prisma.auditLog.create({
    data: {
      orderId: order1.id,
      action: "STATUS_CHANGE",
      oldValue: "READY",
      newValue: "COMPLETED",
      userId: adminUser.id,
    },
  });

  await prisma.auditLog.create({
    data: {
      orderId: order3.id,
      action: "STATUS_CHANGE",
      oldValue: "PENDING",
      newValue: "ACCEPTED",
      userId: adminUser.id,
    },
  });

  await prisma.auditLog.create({
    data: {
      orderId: order3.id,
      action: "STATUS_CHANGE",
      oldValue: "ACCEPTED",
      newValue: "IN_KITCHEN",
      userId: adminUser.id,
    },
  });

  await prisma.auditLog.create({
    data: {
      orderId: order4.id,
      action: "PAYMENT_STATUS_CHANGE",
      oldValue: "UNPAID",
      newValue: "PAID",
      userId: adminUser.id,
    },
  });

  await prisma.auditLog.create({
    data: {
      orderId: order5.id,
      action: "STATUS_CHANGE",
      oldValue: "IN_KITCHEN",
      newValue: "READY",
      userId: adminUser.id,
    },
  });

  // Create some additional order item options for existing orders
  console.log("Adding order item options...");

  // Find the burger order item from order1 to add selected options
  const burgerOrderItem = await prisma.orderItem.findFirst({
    where: {
      orderId: order1.id,
      itemId: burgerItem.id,
    },
  });

  if (burgerOrderItem) {
    // Add the selected options for the burger (Large size + Bacon)
    const largeSizeOption = await prisma.itemOption.findFirst({
      where: {
        name: "Large",
        group: { itemId: burgerItem.id },
      },
    });

    const baconOption = await prisma.itemOption.findFirst({
      where: {
        name: "Bacon",
        group: { itemId: burgerItem.id },
      },
    });

    if (largeSizeOption) {
      await prisma.orderItemOption.create({
        data: {
          orderItemId: burgerOrderItem.id,
          optionId: largeSizeOption.id,
          price: 300,
        },
      });
    }

    if (baconOption) {
      await prisma.orderItemOption.create({
        data: {
          orderItemId: burgerOrderItem.id,
          optionId: baconOption.id,
          price: 250,
        },
      });
    }
  }

  // Find the wings order item from order1 to add sauce selection
  const wingsOrderItem = await prisma.orderItem.findFirst({
    where: {
      orderId: order1.id,
      itemId: wingsItem.id,
    },
  });

  if (wingsOrderItem) {
    const buffaloSauceOption = await prisma.itemOption.findFirst({
      where: {
        name: "Buffalo",
        group: { itemId: wingsItem.id },
      },
    });

    if (buffaloSauceOption) {
      await prisma.orderItemOption.create({
        data: {
          orderItemId: wingsOrderItem.id,
          optionId: buffaloSauceOption.id,
          price: 0,
        },
      });
    }
  }

  console.log("✅ Database seed completed successfully!");

  // Print summary
  const categoriesCount = await prisma.category.count();
  const itemsCount = await prisma.item.count();
  const usersCount = await prisma.user.count();
  const ordersCount = await prisma.order.count();
  const paymentsCount = await prisma.payment.count();
  const couponsCount = await prisma.coupon.count();
  const expensesCount = await prisma.expense.count();
  const auditLogsCount = await prisma.auditLog.count();

  console.log("\n📊 Seed Summary:");
  console.log(`   Categories: ${categoriesCount}`);
  console.log(`   Menu Items: ${itemsCount}`);
  console.log(`   Users: ${usersCount}`);
  console.log(`   Orders: ${ordersCount}`);
  console.log(`   Payments: ${paymentsCount}`);
  console.log(`   Coupons: ${couponsCount}`);
  console.log(`   Expenses: ${expensesCount}`);
  console.log(`   Audit Logs: ${auditLogsCount}`);

  console.log("\n🔐 Default Login Credentials:");
  console.log("   Admin: admin@deliciousbites.com / admin123");
  console.log("   Customer: customer@example.com / customer123");

  console.log("\n💳 Test Payment Methods:");
  console.log("   Stripe: Use test card numbers (4242424242424242)");
  console.log("   COD: Orders marked as UNPAID until admin confirms payment");

  console.log("\n🎫 Test Coupons:");
  console.log("   WELCOME10: 10% off (min $20 order)");
  console.log("   SAVE5: $5 off (min $25 order)");
  console.log("   BIGORDER: 15% off (min $50 order)");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
