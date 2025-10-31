// In-memory data storage for the E-Commerce application
// Note: Data will be lost when the server restarts

class InMemoryStorage {
  constructor() {
    this.users = [];
    this.products = [];
    this.orders = [];
    this.carts = new Map(); // userId -> cart items
    this.initializeSampleData();
  }

  // Initialize with sample data
  initializeSampleData() {
    // Sample users
    this.users = [
      {
        id: '1',
        email: 'admin@kumaravel.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        name: 'Kumaravel Admin',
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'user@kumaravel.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        name: 'Kumaravel User',
        role: 'user',
        createdAt: new Date().toISOString()
      }
    ];

    // Sample products with detailed information
    this.products = [
      {
        id: '1',
        name: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
        description: 'Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo. Up to 30-hour battery life with quick charge (10 min charge for 5 hours of playback). Touch Sensor controls to pause/play/skip tracks, control volume, activate your voice assistant, and answer phone calls. Speak-to-Chat technology automatically reduces volume during conversations. Superior call quality with precise voice pickup. Wearing detection pauses playback when headphones are removed. Seamless multiple-device pairing. Quick Attention mode for quick ambient sound check.',
        price: 349.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        stock: 50,
        rating: 4.8,
        reviews: 1247,
        brand: 'Sony',
        color: 'Black',
        weight: '254g',
        batteryLife: '30 hours',
        connectivity: 'Bluetooth 5.0',
        features: ['Active Noise Cancellation', 'Quick Charge', 'Touch Controls', 'Voice Assistant'],
        specifications: {
          'Driver Unit': '40mm',
          'Frequency Response': '4Hz-40kHz',
          'Impedance': '32 ohms',
          'Sensitivity': '105 dB/mW',
          'Battery Life': '30 hours (NC on)',
          'Charging Time': '3 hours',
          'Weight': '254g'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Apple Watch Series 9 GPS + Cellular',
        description: 'The most advanced Apple Watch yet. Features a powerful S9 chip, brighter display, and enhanced health monitoring. Track your fitness goals with advanced sensors, monitor your heart health, and stay connected with cellular connectivity. Water resistant to 50 meters. Built-in GPS, heart rate monitor, blood oxygen sensor, and ECG app. Sleep tracking, fall detection, and emergency SOS. Compatible with thousands of apps from the App Store.',
        price: 429.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop',
        stock: 30,
        rating: 4.7,
        reviews: 892,
        brand: 'Apple',
        color: 'Midnight',
        weight: '38.8g',
        batteryLife: '18 hours',
        connectivity: 'GPS + Cellular',
        features: ['Health Monitoring', 'GPS', 'Cellular', 'Water Resistant', 'ECG'],
        specifications: {
          'Display': '45mm Always-On Retina',
          'Chip': 'S9 SiP',
          'Storage': '64GB',
          'Battery Life': '18 hours',
          'Water Resistance': '50 meters',
          'Sensors': 'Heart Rate, Blood Oxygen, ECG',
          'Connectivity': 'GPS + Cellular'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Premium Organic Cotton T-Shirt Collection',
        description: 'Made from 100% organic cotton grown without harmful pesticides. Soft, breathable, and comfortable for all-day wear. Pre-shrunk fabric maintains shape wash after wash. Available in multiple colors and sizes. Perfect for casual wear, workouts, or layering. Ethically sourced and sustainably produced. Machine washable and tumble dry safe.',
        price: 24.99,
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
        stock: 150,
        rating: 4.5,
        reviews: 234,
        brand: 'EcoWear',
        color: 'Multiple Colors',
        weight: '150g',
        material: '100% Organic Cotton',
        care: 'Machine Wash Cold',
        features: ['Organic Cotton', 'Pre-shrunk', 'Breathable', 'Sustainable'],
        specifications: {
          'Material': '100% Organic Cotton',
          'Weight': '150g/m²',
          'Fit': 'Regular Fit',
          'Care': 'Machine Wash Cold',
          'Origin': 'Fair Trade Certified',
          'Colors': 'White, Black, Navy, Gray, Green'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Canon EF 50mm f/1.8 STM Lens',
        description: 'A versatile, fast prime lens perfect for portraits, low-light photography, and creative shallow depth-of-field effects. Features Canon\'s STM (Stepping Motor) technology for smooth, quiet autofocus during video recording. Compact and lightweight design makes it ideal for everyday photography. Sharp image quality with beautiful bokeh. Compatible with all Canon EF mount cameras.',
        price: 125.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop',
        stock: 25,
        rating: 4.6,
        reviews: 456,
        brand: 'Canon',
        color: 'Black',
        weight: '160g',
        mount: 'Canon EF',
        features: ['Fast f/1.8 Aperture', 'STM Autofocus', 'Compact Design', 'Sharp Image Quality'],
        specifications: {
          'Focal Length': '50mm',
          'Maximum Aperture': 'f/1.8',
          'Minimum Aperture': 'f/22',
          'Lens Construction': '6 elements in 5 groups',
          'Minimum Focus Distance': '0.35m',
          'Filter Size': '49mm',
          'Weight': '160g'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Herschel Supply Co. Heritage Backpack',
        description: 'Classic backpack design with modern functionality. Made from durable polyester with leather accents. Features a padded laptop sleeve, front utility pocket with key clip, and signature striped liner. Adjustable shoulder straps and top handle for versatile carrying options. Perfect for work, travel, or daily adventures.',
        price: 89.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
        stock: 40,
        rating: 4.4,
        reviews: 189,
        brand: 'Herschel Supply Co.',
        color: 'Black',
        weight: '680g',
        capacity: '25L',
        material: 'Polyester with Leather Accents',
        features: ['Laptop Sleeve', 'Front Utility Pocket', 'Adjustable Straps', 'Signature Liner'],
        specifications: {
          'Capacity': '25L',
          'Material': 'Polyester with Leather Accents',
          'Dimensions': '48cm x 30cm x 16cm',
          'Weight': '680g',
          'Laptop Sleeve': 'Fits up to 15" laptop',
          'Pockets': 'Main compartment, front utility pocket',
          'Straps': 'Adjustable shoulder straps'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '6',
        name: 'JBL Charge 4 Portable Bluetooth Speaker',
        description: 'Wireless Bluetooth streaming with up to 20 hours of playtime. IPX7 waterproof design means no more worrying about rain or spills. Built-in powerbank lets you charge your devices without taking a break from the music. JBL Connect+ technology allows you to wirelessly connect more than 100 JBL Connect+ enabled speakers. Dual passive radiators deliver powerful, ear-catching JBL sound that resonates loud and clear.',
        price: 149.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
        stock: 60,
        rating: 4.5,
        reviews: 567,
        brand: 'JBL',
        color: 'Black',
        weight: '965g',
        batteryLife: '20 hours',
        connectivity: 'Bluetooth 4.2',
        features: ['Waterproof', 'Powerbank', 'JBL Connect+', '20hr Battery'],
        specifications: {
          'Battery Life': '20 hours',
          'Charging Time': '4 hours',
          'Connectivity': 'Bluetooth 4.2',
          'Waterproof Rating': 'IPX7',
          'Powerbank': 'Yes',
          'Dimensions': '22cm x 9.5cm x 9.3cm',
          'Weight': '965g'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '7',
        name: 'Nike Air Max 270 Running Shoes',
        description: 'The Air Max 270 delivers visible cushioning under every step. The design draws inspiration from Air Max icons, showcasing Nike\'s greatest innovation with its large window and fresh array of colors. The Max Air unit provides lightweight cushioning for all-day comfort. Breathable mesh upper with synthetic overlays for durability and support.',
        price: 150.00,
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        stock: 80,
        rating: 4.3,
        reviews: 345,
        brand: 'Nike',
        color: 'White/Black',
        weight: '320g',
        material: 'Mesh and Synthetic',
        features: ['Max Air Cushioning', 'Breathable Mesh', 'Lightweight', 'Durable'],
        specifications: {
          'Upper': 'Mesh and Synthetic',
          'Midsole': 'Max Air Cushioning',
          'Outsole': 'Rubber',
          'Weight': '320g (size 9)',
          'Drop': '8mm',
          'Sizes': '6-13 (US)',
          'Colors': 'Multiple options available'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '8',
        name: 'MacBook Air M2 Chip 13-inch',
        description: 'Supercharged by the M2 chip, MacBook Air delivers exceptional performance and efficiency. The 13.6-inch Liquid Retina display is bright, vibrant, and beautiful. With up to 18 hours of battery life, you can work, play, and create all day. The advanced camera and audio system make video calls and recordings sound and look amazing. Available in four gorgeous finishes.',
        price: 1199.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
        stock: 15,
        rating: 4.9,
        reviews: 1234,
        brand: 'Apple',
        color: 'Space Gray',
        weight: '1.24kg',
        batteryLife: '18 hours',
        connectivity: 'Wi-Fi 6, Bluetooth 5.0',
        features: ['M2 Chip', 'Liquid Retina Display', '18hr Battery', 'Advanced Camera'],
        specifications: {
          'Chip': 'Apple M2',
          'Display': '13.6-inch Liquid Retina',
          'Memory': '8GB unified memory',
          'Storage': '256GB SSD',
          'Battery Life': '18 hours',
          'Weight': '1.24kg',
          'Ports': '2x Thunderbolt / USB 4'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '9',
        name: 'Levi\'s 501 Original Fit Jeans',
        description: 'The original blue jean. Since 1873, the 501 has been the standard for authentic American style. Made with 100% cotton denim and featuring the classic straight leg fit. These jeans are designed to be worn in and will develop a unique character over time. The iconic button fly and five-pocket styling make these a timeless wardrobe essential.',
        price: 89.50,
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
        stock: 120,
        rating: 4.2,
        reviews: 678,
        brand: 'Levi\'s',
        color: 'Blue',
        weight: '600g',
        material: '100% Cotton Denim',
        features: ['Original Fit', 'Button Fly', 'Five-Pocket Style', '100% Cotton'],
        specifications: {
          'Fit': 'Original Straight',
          'Rise': 'Mid Rise',
          'Material': '100% Cotton Denim',
          'Closure': 'Button Fly',
          'Pockets': '5-pocket styling',
          'Sizes': '28-40 (waist)',
          'Inseam': '32" standard'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '10',
        name: 'Ray-Ban Aviator Classic Sunglasses',
        description: 'The original aviator sunglasses. Timeless style meets superior protection with G-15 lenses that reduce glare and enhance contrast. Made with lightweight metal frames and crystal lenses. The classic teardrop shape and double bridge design have made these sunglasses an icon for over 80 years. Perfect for driving, outdoor activities, or everyday style.',
        price: 154.00,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop',
        stock: 35,
        rating: 4.6,
        reviews: 234,
        brand: 'Ray-Ban',
        color: 'Gold/Green',
        weight: '32g',
        material: 'Metal Frame, Crystal Lenses',
        features: ['G-15 Lenses', 'UV Protection', 'Lightweight', 'Classic Design'],
        specifications: {
          'Lens Material': 'Crystal',
          'Frame Material': 'Metal',
          'Lens Color': 'Green',
          'Frame Color': 'Gold',
          'Lens Width': '58mm',
          'Bridge Width': '14mm',
          'Temple Length': '140mm'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '11',
        name: 'Dyson V15 Detect Cordless Vacuum',
        description: 'Advanced cordless vacuum with laser dust detection and powerful suction. The laser reveals microscopic dust on hard floors, while the powerful motor captures both fine dust and large debris. Up to 60 minutes of fade-free suction. Advanced whole-machine filtration captures 99.99% of particles as small as 0.3 microns. Intelligent suction automatically adjusts power based on dust levels.',
        price: 749.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop',
        stock: 20,
        rating: 4.7,
        reviews: 456,
        brand: 'Dyson',
        color: 'Yellow/Nickel',
        weight: '3.0kg',
        batteryLife: '60 minutes',
        connectivity: 'N/A',
        features: ['Laser Detection', '60min Runtime', 'Advanced Filtration', 'Intelligent Suction'],
        specifications: {
          'Runtime': 'Up to 60 minutes',
          'Suction Power': '230 AW',
          'Dustbin Capacity': '0.77L',
          'Weight': '3.0kg',
          'Filtration': '99.99% of particles 0.3 microns',
          'Charging Time': '4.5 hours',
          'Attachments': 'Laser slim fluffy, Hair screw tool'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '12',
        name: 'Patagonia Better Sweater Fleece Jacket',
        description: 'Made from 100% recycled polyester fleece, this jacket is warm, comfortable, and environmentally responsible. Features a full-zip front, stand-up collar, and zippered chest pocket. The classic fit and timeless style make it perfect for layering or wearing on its own. Durable and long-lasting construction backed by Patagonia\'s Ironclad Guarantee.',
        price: 99.00,
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop',
        stock: 45,
        rating: 4.4,
        reviews: 189,
        brand: 'Patagonia',
        color: 'Navy Blue',
        weight: '400g',
        material: '100% Recycled Polyester',
        features: ['Recycled Material', 'Full-Zip', 'Chest Pocket', 'Classic Fit'],
        specifications: {
          'Material': '100% Recycled Polyester',
          'Weight': '400g',
          'Fit': 'Classic',
          'Features': 'Full-zip front, stand-up collar, zippered chest pocket',
          'Care': 'Machine wash cold, tumble dry low',
          'Sustainability': 'Made from recycled materials'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '13',
        name: 'Kumaravel Signature Smart Home Hub',
        description: 'Revolutionary smart home control center designed by Kumaravel. Features AI-powered automation, voice control, and seamless integration with 1000+ devices. The unique hexagonal design with ambient lighting creates a modern aesthetic while providing intuitive control over your entire smart home ecosystem.',
        price: 299.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop',
        stock: 25,
        rating: 4.8,
        reviews: 156,
        brand: 'Kumaravel Tech',
        color: 'Midnight Black',
        weight: '450g',
        batteryLife: 'Always Powered',
        connectivity: 'Wi-Fi 6, Zigbee, Z-Wave, Bluetooth 5.2',
        features: ['AI Automation', 'Voice Control', 'Ambient Lighting', '1000+ Device Support'],
        specifications: {
          'Processor': 'Quad-core ARM Cortex-A78',
          'Memory': '4GB RAM, 32GB Storage',
          'Connectivity': 'Wi-Fi 6, Zigbee, Z-Wave, Bluetooth 5.2',
          'Voice Assistant': 'Built-in Kumaravel AI',
          'Power': 'AC Adapter with Battery Backup',
          'Dimensions': '12cm x 12cm x 3cm',
          'Weight': '450g'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '14',
        name: 'Artisan Handwoven Silk Scarf Collection',
        description: 'Exquisite handwoven silk scarves featuring traditional patterns with modern interpretations. Each piece is unique, crafted by master artisans using centuries-old techniques. The premium mulberry silk provides luxurious softness and natural sheen. Perfect for special occasions or everyday elegance.',
        price: 89.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop',
        stock: 30,
        rating: 4.9,
        reviews: 78,
        brand: 'Kumaravel Artisan',
        color: 'Various Patterns',
        weight: '45g',
        material: '100% Mulberry Silk',
        features: ['Handwoven', 'Traditional Patterns', 'Premium Silk', 'Unique Design'],
        specifications: {
          'Material': '100% Mulberry Silk',
          'Dimensions': '90cm x 90cm',
          'Weight': '45g',
          'Care': 'Dry clean only',
          'Origin': 'Handcrafted by Master Artisans',
          'Pattern': 'Traditional with Modern Twist',
          'Packaging': 'Premium Gift Box'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '15',
        name: 'Premium Espresso Machine Pro',
        description: 'Professional-grade espresso machine designed for coffee enthusiasts. Features PID temperature control, 15-bar pump pressure, and dual boiler system for perfect extraction. The sleek stainless steel design with touch display provides both functionality and elegance. Includes professional portafilter and tamper.',
        price: 899.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop',
        stock: 12,
        rating: 4.7,
        reviews: 234,
        brand: 'Kumaravel Coffee',
        color: 'Stainless Steel',
        weight: '18.5kg',
        material: 'Stainless Steel with Brass Components',
        features: ['PID Control', 'Dual Boiler', '15-Bar Pump', 'Touch Display'],
        specifications: {
          'Pump Pressure': '15 bar',
          'Boiler': 'Dual boiler system',
          'Temperature Control': 'PID with ±1°C accuracy',
          'Display': '4.3" Touch Screen',
          'Portafilter': '58mm Professional',
          'Weight': '18.5kg',
          'Dimensions': '35cm x 30cm x 40cm'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '16',
        name: 'Sustainable Bamboo Laptop Stand',
        description: 'Eco-friendly laptop stand made from sustainably sourced bamboo. Features adjustable height and angle for optimal ergonomics. The natural bamboo grain provides a unique aesthetic while the sturdy construction supports laptops up to 5kg. Includes non-slip rubber pads and cable management system.',
        price: 49.99,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
        stock: 60,
        rating: 4.5,
        reviews: 189,
        brand: 'Kumaravel Eco',
        color: 'Natural Bamboo',
        weight: '800g',
        material: 'Sustainably Sourced Bamboo',
        features: ['Adjustable Height', 'Cable Management', 'Non-slip Pads', 'Eco-friendly'],
        specifications: {
          'Material': 'Sustainably Sourced Bamboo',
          'Weight Capacity': 'Up to 5kg',
          'Height Range': '8-15cm adjustable',
          'Angle': '0-30° adjustable',
          'Weight': '800g',
          'Dimensions': '28cm x 20cm x 8-15cm',
          'Compatibility': 'All laptop sizes'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '17',
        name: 'Wireless Charging Pad with LED Display',
        description: 'Advanced wireless charging pad with integrated LED display showing charging status and time. Features fast charging up to 15W, temperature monitoring, and foreign object detection. The sleek design with RGB ambient lighting creates a modern workspace aesthetic while providing efficient charging.',
        price: 79.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1601972602288-526ecb63cdb4?w=500&h=500&fit=crop',
        stock: 40,
        rating: 4.6,
        reviews: 145,
        brand: 'Kumaravel Power',
        color: 'Space Gray',
        weight: '320g',
        material: 'Aluminum with Soft-touch Surface',
        features: ['15W Fast Charge', 'LED Display', 'Temperature Monitor', 'RGB Lighting'],
        specifications: {
          'Charging Power': 'Up to 15W',
          'Compatibility': 'Qi-enabled devices',
          'Display': 'OLED Status Display',
          'Lighting': 'RGB Ambient LED',
          'Safety': 'Foreign Object Detection',
          'Weight': '320g',
          'Dimensions': '12cm x 12cm x 1.5cm'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '18',
        name: 'Artisan Ceramic Dinnerware Set',
        description: 'Handcrafted ceramic dinnerware set featuring unique glazes and organic shapes. Each piece is individually made by skilled artisans, ensuring no two sets are exactly alike. The natural earth tones and smooth finish create a warm, inviting dining experience. Microwave and dishwasher safe.',
        price: 129.99,
        category: 'Home & Kitchen',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
        stock: 20,
        rating: 4.8,
        reviews: 67,
        brand: 'Kumaravel Ceramics',
        color: 'Earth Tones',
        weight: '2.5kg',
        material: 'High-fired Ceramic',
        features: ['Handcrafted', 'Unique Glazes', 'Microwave Safe', 'Dishwasher Safe'],
        specifications: {
          'Material': 'High-fired Ceramic',
          'Set Includes': '4 dinner plates, 4 salad plates, 4 bowls, 4 mugs',
          'Weight': '2.5kg total',
          'Care': 'Dishwasher and microwave safe',
          'Finish': 'Food-safe glazes',
          'Origin': 'Handcrafted by Artisans',
          'Packaging': 'Eco-friendly gift box'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  // User methods
  createUser(userData) {
    const user = {
      id: this.generateId(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    this.users.push(user);
    return user;
  }

  findUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  findUserById(id) {
    return this.users.find(user => user.id === id);
  }

  updateUser(id, updateData) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      return this.users[userIndex];
    }
    return null;
  }

  // Product methods
  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  createProduct(productData) {
    const product = {
      id: this.generateId(),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.products.push(product);
    return product;
  }

  updateProduct(id, updateData) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      return this.products[productIndex];
    }
    return null;
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      return this.products.splice(productIndex, 1)[0];
    }
    return null;
  }

  searchProducts(query, category, minPrice, maxPrice) {
    let filteredProducts = [...this.products];

    // Search by name or description
    if (query) {
      const searchTerm = query.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by price range
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    }

    return filteredProducts;
  }

  // Cart methods
  getCart(userId) {
    return this.carts.get(userId) || [];
  }

  addToCart(userId, productId, quantity = 1) {
    const product = this.getProductById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const cart = this.getCart(userId);
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }

    this.carts.set(userId, cart);
    return this.getCart(userId);
  }

  updateCartItem(userId, productId, quantity) {
    const cart = this.getCart(userId);
    const item = cart.find(item => item.productId === productId);

    if (item) {
      if (quantity <= 0) {
        cart.splice(cart.indexOf(item), 1);
      } else {
        item.quantity = quantity;
      }
      this.carts.set(userId, cart);
    }

    return this.getCart(userId);
  }

  removeFromCart(userId, productId) {
    const cart = this.getCart(userId);
    const filteredCart = cart.filter(item => item.productId !== productId);
    this.carts.set(userId, filteredCart);
    return this.getCart(userId);
  }

  clearCart(userId) {
    this.carts.set(userId, []);
  }

  // Order methods
  createOrder(userId, orderData) {
    const order = {
      id: this.generateId(),
      userId,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.orders.push(order);
    return order;
  }

  getOrdersByUser(userId) {
    return this.orders.filter(order => order.userId === userId);
  }

  getAllOrders() {
    return this.orders;
  }

  updateOrderStatus(orderId, status) {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
    }
    return order;
  }

  // Utility methods
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Get categories
  getCategories() {
    const categories = [...new Set(this.products.map(product => product.category))];
    return categories.sort();
  }

  // Get cart summary
  getCartSummary(userId) {
    const cart = this.getCart(userId);
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
      const product = this.getProductById(item.productId);
      if (product) {
        totalItems += item.quantity;
        totalPrice += product.price * item.quantity;
      }
    });

    return {
      totalItems,
      totalPrice: Math.round(totalPrice * 100) / 100,
      items: cart.map(item => {
        const product = this.getProductById(item.productId);
        return {
          ...item,
          product: product ? {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
          } : null
        };
      }).filter(item => item.product)
    };
  }
}

// Create singleton instance
const storage = new InMemoryStorage();

module.exports = storage;
