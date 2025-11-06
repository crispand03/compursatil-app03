
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Package, 
  ShoppingBag, 
  FileText, 
  Shield, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  AlertTriangle, 
  BarChart3, 
  Settings,
  User,
  LogOut,
  Filter,
  Calendar,
  CreditCard,
  Phone,
  Mail,
  FileCheck,
  Wrench,
  BookOpen,
  TrendingUp,
  Menu,
  X,
  Eye,
  EyeOff,
  Upload,
  Image as ImageIcon,
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick,
  MonitorSmartphone,
  Laptop,
  Tv,
  BarChart2,
  PieChart,
  Clock,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  MinusCircle
} from 'lucide-react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState({ name: '', role: '' });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showReceiptPreview, setShowReceiptPreview] = useState(false);
  const [selectedSaleForReceipt, setSelectedSaleForReceipt] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date('2025-10-06T00:00:00'));
  
  // Receipt configuration
  const [receiptConfig, setReceiptConfig] = useState({
    companyName: 'COMPURSATIL IMPORTACIONES',
    address: 'Av. Francisco Bolognesi 376 - Lima',
    phone: '987 654 321',
    ruc: '10078945612'
  });

  // Mock users for authentication with proper role names
  const mockUsers = [
    { username: 'admin', password: 'admin123', name: 'Administrador', role: 'Administrador' },
    { username: 'vendedor', password: 'venta123', name: 'Vendedor', role: 'Vendedor' },
    { username: 'tecnico', password: 'tech123', name: 'Técnico', role: 'Técnico' }
  ];

  // Categories for filtering and management
  const [categories, setCategories] = useState({
    processor: ['Intel Core i7 - 10ma Generación', 'Intel Core i5 - 14ta Generación', 'Intel Core i9 - 12va Generación', 'AMD Ryzen 7 - 5000 Serie', 'AMD Ryzen 5 - 4000 Serie'],
    ram: ['8GB DDR4', '16GB DDR4', '32GB DDR4', '64GB DDR4'],
    storage: ['256GB SSD NVMe', '512GB SSD NVMe', '1TB SSD NVMe', '2TB SSD NVMe'],
    gpu: ['Gráficos Integrados Intel', 'NVIDIA GeForce RTX 3060', 'NVIDIA GeForce RTX 4070', 'AMD Radeon RX 6700 XT'],
    screen: ['13.3 pulgadas Full HD', '14 pulgadas Full HD', '15.6 pulgadas Full HD', '17.3 pulgadas 4K'],
    os: ['Windows 11 Pro', 'Windows 10 Pro', 'Linux Ubuntu 22.04', 'Sin Sistema Operativo']
  });

  // Extra components pricing
  const [extraComponents, setExtraComponents] = useState([
    { id: 1, name: '+8GB RAM', price: 100, category: 'ram' },
    { id: 2, name: '+16GB RAM', price: 200, category: 'ram' },
    { id: 3, name: 'Upgrade 256GB to 512GB SSD', price: 120, category: 'storage' },
    { id: 4, name: 'Upgrade 512GB to 1TB SSD', price: 150, category: 'storage' },
    { id: 5, name: 'NVIDIA GeForce RTX 3060', price: 300, category: 'gpu' },
    { id: 6, name: 'NVIDIA GeForce RTX 4070', price: 500, category: 'gpu' }
  ]);

  // Mock inventory data with enhanced fields and dates
  const [inventory, setInventory] = useState([
    {
      id: 1,
      brand: 'Dell',
      model: 'XPS 13 9310',
      serial: 'DELL123456',
      ram: '16GB DDR4',
      storage: '512GB SSD NVMe',
      processor: 'Intel Core i7 - 10ma Generación',
      gpu: 'Gráficos Integrados Intel',
      screen: '13.3 pulgadas Full HD',
      os: 'Windows 11 Pro',
      status: 'Nuevo',
      supplier: 'Dell Inc. Perú',
      cost: 2800,
      price: 4200,
      stock: 5,
      image: 'https://placehold.co/300x200/2563eb/white?text=Dell+XPS+13',
      addedDate: '2024-01-10'
    },
    {
      id: 2,
      brand: 'HP',
      model: 'Spectre x360 14',
      serial: 'HP789012',
      ram: '8GB DDR4',
      storage: '256GB SSD NVMe',
      processor: 'Intel Core i5 - 14ta Generación',
      gpu: 'Gráficos Integrados Intel',
      screen: '14 pulgadas Full HD',
      os: 'Windows 11 Pro',
      status: 'Reacondicionado',
      supplier: 'HP Store Lima',
      cost: 1400,
      price: 2450,
      stock: 2,
      image: 'https://placehold.co/300x200/dc2626/white?text=HP+Spectre',
      addedDate: '2024-01-12'
    },
    {
      id: 3,
      brand: 'Lenovo',
      model: 'ThinkPad X1 Carbon',
      serial: 'LEN456789',
      ram: '32GB DDR4',
      storage: '1TB SSD NVMe',
      processor: 'Intel Core i7 - 10ma Generación',
      gpu: 'NVIDIA GeForce RTX 3060',
      screen: '15.6 pulgadas Full HD',
      os: 'Windows 10 Pro',
      status: 'Nuevo',
      supplier: 'Lenovo Peru S.A.',
      cost: 3500,
      price: 5250,
      stock: 3,
      image: 'https://placehold.co/300x200/059669/white?text=Lenovo+ThinkPad',
      addedDate: '2024-01-15'
    },
    {
      id: 4,
      brand: 'Asus',
      model: 'ROG Strix G17',
      serial: 'ASUS987654',
      ram: '16GB DDR4',
      storage: '1TB SSD NVMe',
      processor: 'Intel Core i9 - 12va Generación',
      gpu: 'NVIDIA GeForce RTX 4070',
      screen: '17.3 pulgadas 4K',
      os: 'Windows 11 Pro',
      status: 'Nuevo',
      supplier: 'Asus Peru Distribuidor',
      cost: 4200,
      price: 6300,
      stock: 1,
      image: 'https://placehold.co/300x200/7c3aed/white?text=Asus+ROG',
      addedDate: '2024-01-18'
    }
  ]);

  // Mock sales data with extra components
  const [sales, setSales] = useState([
    {
      id: 1,
      date: '2025-10-05',
      time: '14:30',
      customer: 'Juan Pérez',
      customerId: 1,
      items: [{ 
        id: 1, 
        quantity: 1, 
        price: 4200, 
        subtotal: 3559.32, 
        igv: 640.68,
        extras: []
      }],
      total: 4200,
      seller: 'María López',
      payment: 'Efectivo',
      documentType: 'Boleta',
      documentNumber: 'B001-000001',
      observations: 'Cliente solicitó actualización de RAM a 32GB'
    },
    {
      id: 2,
      date: '2025-10-04',
      time: '10:15',
      customer: 'Empresa Tech S.A.C.',
      customerId: 3,
      items: [{ 
        id: 3, 
        quantity: 1, 
        price: 5250, 
        subtotal: 4449.15, 
        igv: 800.85,
        extras: [
          { id: 1, name: '+8GB RAM', price: 100 }
        ]
      }],
      total: 5350,
      seller: 'Carlos Rodríguez',
      payment: 'Tarjeta',
      documentType: 'Factura',
      documentNumber: 'F001-000001',
      observations: 'Cliente solicitó upgrade de almacenamiento a 2TB'
    }
  ]);

  // Mock customers data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Juan Pérez',
      document: '12345678',
      phone: '+51 987 654 321',
      email: 'juan@email.com',
      documentType: 'DNI'
    },
    {
      id: 2,
      name: 'Ana García',
      document: '87654321',
      phone: '+51 912 345 678',
      email: 'ana@email.com',
      documentType: 'DNI'
    },
    {
      id: 3,
      name: 'Empresa Tech S.A.C.',
      document: '20123456789',
      phone: '+51 999 888 777',
      email: 'contacto@techsac.com',
      documentType: 'RUC'
    }
  ]);

  // Mock warranties data
  const [warranties, setWarranties] = useState([
    {
      id: 1,
      serial: 'DELL123456',
      customerId: 1,
      startDate: '2025-10-05',
      endDate: '2026-10-05',
      status: 'Activa',
      saleId: 1,
      warrantyType: 'Fabricante',
      technicalSupportId: null
    }
  ]);

  // Mock technical cases data
  const [technicalCases, setTechnicalCases] = useState([
    {
      id: 1,
      serial: 'HP789012',
      customerId: 2,
      equipmentModel: 'HP Spectre x360 14',
      documentNumber: 'B001-000002',
      documentType: 'Boleta',
      issue: 'Pantalla no enciende',
      diagnosis: 'Problema con la fuente de alimentación',
      actions: 'Reemplazo de adaptador de corriente original',
      status: 'Entregado',
      technician: 'Carlos Rodríguez',
      date: '2025-10-03',
      warrantyStartDate: '2025-10-03',
      supportType: 'Garantía',
      firstIntervention: '2025-10-03',
      observations: 'Cliente reportó que el equipo no encendía. Se verificó la fuente de alimentación y se reemplazó el adaptador original.'
    },
    {
      id: 2,
      serial: 'ASUS987654',
      customerId: 3,
      equipmentModel: 'Asus ROG Strix G17',
      documentNumber: 'F001-000002',
      documentType: 'Factura',
      issue: 'Sobrecalentamiento',
      diagnosis: 'Ventiladores obstruidos por polvo',
      actions: 'Limpieza de ventiladores y reemplazo de pasta térmica',
      status: 'En reparación',
      technician: 'María López',
      date: '2025-10-05',
      warrantyStartDate: '2025-10-05',
      supportType: 'Garantía',
      firstIntervention: '2025-10-05',
      observations: 'Cliente reportó sobrecalentamiento. Se diagnosticó acumulación de polvo en los ventiladores. Se programó limpieza y reemplazo de pasta térmica.'
    }
  ]);

  // Mock users data
  const [users, setUsers] = useState(mockUsers.map((user, index) => ({
    ...user,
    id: index + 1,
    status: 'Activo'
  })));

  // Login handler - Fixed input issue
  const handleLogin = useCallback((e) => {
    e.preventDefault();
    const user = users.find(u => 
      u.username === loginUsername && 
      u.password === loginPassword
    );
    
    if (user) {
      setCurrentUser({ name: user.name, role: user.role });
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Credenciales incorrectas');
    }
  }, [loginUsername, loginPassword, users]);

  // Fixed input handlers
  const handleUsernameChange = useCallback((e) => {
    setLoginUsername(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setLoginPassword(e.target.value);
  }, []);

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ name: '', role: '' });
    setActiveModule('dashboard');
    setLoginUsername('');
    setLoginPassword('');
    setLoginError('');
  };

  // CRUD Operations
  const addInventoryItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: inventory.length + 1,
      image: newItem.image || `https://placehold.co/300x200/6366f1/white?text=${encodeURIComponent(newItem.brand + ' ' + newItem.model)}`,
      addedDate: new Date().toISOString().split('T')[0]
    };
    setInventory([...inventory, itemWithId]);
  };

  const updateInventoryItem = (updatedItem) => {
    setInventory(inventory.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const deleteInventoryItem = (id) => {
    if (window.confirm('¿Está seguro de eliminar este equipo del inventario?')) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  const addCustomer = (newCustomer) => {
    const customerWithId = {
      ...newCustomer,
      id: customers.length + 1
    };
    setCustomers([...customers, customerWithId]);
    return customerWithId;
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomers(customers.map(customer => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    ));
  };

  const deleteCustomer = (id) => {
    if (window.confirm('¿Está seguro de eliminar este cliente?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  const calculateIGV = (price) => {
    const subtotal = price / 1.18;
    const igv = price - subtotal;
    return { subtotal: parseFloat(subtotal.toFixed(2)), igv: parseFloat(igv.toFixed(2)) };
  };

  const generateDocumentNumber = (documentType) => {
    const prefix = documentType === 'Boleta' ? 'B001-' : 
                   documentType === 'Factura' ? 'F001-' : 
                   documentType === 'Proforma' ? 'P001-' : 'NV001-';
    
    // Find the highest existing number for this document type
    const existingNumbers = sales
      .filter(sale => sale.documentType === documentType)
      .map(sale => parseInt(sale.documentNumber.split('-')[1]))
      .filter(num => !isNaN(num));
    
    const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
    return `${prefix}${String(nextNumber).padStart(6, '0')}`;
  };

  const validateDocumentNumber = (documentType, documentNumber, currentSaleId = null) => {
    const existing = sales.find(sale =>
      sale.documentType === documentType &&
      sale.documentNumber === documentNumber &&
      sale.id !== currentSaleId
    );
    return !existing;
  };

  const addSale = (newSale) => {
    // Calculate IGV for each item
    const itemsWithIGV = newSale.items.map(item => {
      const { subtotal, igv } = calculateIGV(item.price);
      return { ...item, subtotal, igv };
    });
    
    const saleWithId = {
      ...newSale,
      items: itemsWithIGV,
      id: sales.length + 1,
      date: newSale.date || new Date().toISOString().split('T')[0],
      time: newSale.time || new Date().toLocaleTimeString(),
      seller: currentUser.name
    };
    setSales([...sales, saleWithId]);
    
    // Update inventory stock
    const updatedInventory = inventory.map(item => {
      const soldItem = newSale.items.find(sold => sold.id === item.id);
      if (soldItem) {
        return { ...item, stock: item.stock - soldItem.quantity };
      }
      return item;
    });
    setInventory(updatedInventory);
    
    // Create warranty for each item sold
    newSale.items.forEach(item => {
      const invItem = inventory.find(i => i.id === item.id);
      if (invItem) {
        const warranty = {
          id: warranties.length + 1,
          serial: invItem.serial,
          customerId: parseInt(newSale.customerId),
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
          status: 'Activa',
          saleId: saleWithId.id,
          warrantyType: 'Fabricante',
          technicalSupportId: null
        };
        setWarranties([...warranties, warranty]);
      }
    });
  };

  
  const updateSale = (updatedSale) => {
    // Recalculate IGV for updated items
    const itemsWithIGV = updatedSale.items.map(item => {
      const { subtotal, igv } = calculateIGV(item.price);
      return { ...item, subtotal, igv };
    });
    const total = itemsWithIGV.reduce((sum, it) => sum + (it.price || 0), 0);
    
    setSales(sales.map(sale => 
      sale.id === updatedSale.id ? { ...updatedSale, items: itemsWithIGV, total } : sale
    ));
  };


  const deleteSale = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta venta?')) {
      setSales(sales.filter(sale => sale.id !== id));
    }
  };

  const addTechnicalCase = (newCase) => {
    const caseWithId = {
      ...newCase,
      id: technicalCases.length + 1,
      technician: currentUser.name,
      date: new Date().toISOString().split('T')[0],
      firstIntervention: newCase.supportType === 'Particular' ? new Date().toISOString().split('T')[0] : newCase.warrantyStartDate
    };
    setTechnicalCases([...technicalCases, caseWithId]);
  };

  const updateTechnicalCase = (updatedCase) => {
    setTechnicalCases(technicalCases.map(techCase => 
      techCase.id === updatedCase.id ? updatedCase : techCase
    ));
  };

  const deleteTechnicalCase = (id) => {
    if (window.confirm('¿Está seguro de eliminar este caso técnico?')) {
      setTechnicalCases(technicalCases.filter(techCase => techCase.id !== id));
    }
  };

  const addCategory = (categoryType, value) => {
    setCategories(prev => ({
      ...prev,
      [categoryType]: [...prev[categoryType], value]
    }));
  };

  const deleteCategory = (categoryType, value) => {
    if (window.confirm(`¿Está seguro de eliminar "${value}" de ${categoryType}?`)) {
      setCategories(prev => ({
        ...prev,
        [categoryType]: prev[categoryType].filter(item => item !== value)
      }));
    }
  };

  const addExtraComponent = (newExtra) => {
    const extraWithId = {
      ...newExtra,
      id: extraComponents.length + 1
    };
    setExtraComponents([...extraComponents, extraWithId]);
  };

  const deleteExtraComponent = (id) => {
    if (window.confirm('¿Está seguro de eliminar este componente extra?')) {
      setExtraComponents(extraComponents.filter(extra => extra.id !== id));
    }
  };

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, roles: ['Administrador', 'Vendedor', 'Técnico'] },
    { id: 'inventory', name: 'Inventario', icon: Package, roles: ['Administrador', 'Vendedor'] },
    { id: 'sales', name: 'Ventas', icon: ShoppingBag, roles: ['Administrador', 'Vendedor'] },
    { id: 'customers', name: 'Clientes', icon: Users, roles: ['Administrador', 'Vendedor'] },
    { id: 'warranties', name: 'Garantías', icon: FileCheck, roles: ['Administrador', 'Vendedor', 'Técnico'] },
    { id: 'technical', name: 'Soporte Técnico', icon: Wrench, roles: ['Administrador', 'Técnico'] },
    { id: 'reports', name: 'Reportes', icon: FileText, roles: ['Administrador'] },
    { id: 'users', name: 'Usuarios', icon: Shield, roles: ['Administrador'] },
    { id: 'categories', name: 'Categorías', icon: Settings, roles: ['Administrador'] },
    { id: 'receiptConfig', name: 'Config. Recibo', icon: FileText, roles: ['Administrador'] },
    { id: 'supportTracking', name: 'Seguimiento Soporte', icon: Clock, roles: ['Vendedor', 'Técnico'] }
  ];

  const filteredModules = modules.filter(module => 
    module.roles.includes(currentUser.role)
  );

  const Sidebar = () => (
    <div className={`bg-gray-800 text-white min-h-screen transition-all duration-300 flex flex-col ${
      sidebarCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!sidebarCollapsed && (
          <>
            <div>
              <h1 className="text-xl font-bold">COMPURSATIL</h1>
              <p className="text-xs text-gray-400">Sistema de Gestión</p>
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </>
        )}
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-400 hover:text-white"
          >
            <Menu size={24} />
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto">
      <nav className="p-4">
        {filteredModules.map((module) => {
          const Icon = module.icon;
          return (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                activeModule === module.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              title={sidebarCollapsed ? module.name : ''}
            >
              <Icon size={20} />
              {!sidebarCollapsed && module.name}
            </button>
          );
        })}
      </nav>
      </div>

      {!sidebarCollapsed && (
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gray-600 rounded-full p-2">
              <User size={20} />
            </div>
            <div>
              <p className="font-medium">{currentUser.name}</p>
              <p className="text-xs text-gray-400">{currentUser.role}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-300 hover:text-white w-full p-2 rounded"
          >
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );

  const Login = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">COMPURSATIL</h1>
          <p className="text-gray-600">Sistema de Gestión de Inventarios</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de usuario
            </label>
            <input
              type="text"
              value={loginUsername}
              onChange={handleUsernameChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingrese su usuario"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={loginPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder="Ingrese su contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          {loginError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {loginError}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Credenciales de prueba:</p>
          <p className="font-medium">Admin: admin/admin123</p>
          <p className="font-medium">Vendedor: vendedor/venta123</p>
          <p className="font-medium">Técnico: tecnico/tech123</p>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => {
    const totalInventoryValue = inventory.reduce((sum, item) => sum + (item.cost * item.stock), 0);
    const totalSalesValue = sales.reduce((sum, sale) => sum + sale.total, 0);
    const lowStockItems = inventory.filter(item => item.stock <= 2).length;
    const totalSalesCount = sales.length;
    const recentSales = sales.slice(-3).reverse();
    const recentTechCases = technicalCases.slice(-3).reverse();
    
    // Generate some sample data for charts
    const salesData = [
      { month: 'Ene', sales: 15000 },
      { month: 'Feb', sales: 18000 },
      { month: 'Mar', sales: 22000 },
      { month: 'Abr', sales: 25000 },
      { month: 'May', sales: 28000 },
      { month: 'Jun', sales: 30000 },
      { month: 'Jul', sales: 32000 },
      { month: 'Ago', sales: 35000 },
      { month: 'Sep', sales: 38000 },
      { month: 'Oct', sales: 40000 },
      { month: 'Nov', sales: 42000 },
      { month: 'Dic', sales: 45000 }
    ];
    
    const productDistribution = inventory.reduce((acc, item) => {
      const existing = acc.find(i => i.brand === item.brand);
      if (existing) {
        existing.count += item.stock;
      } else {
        acc.push({ brand: item.brand, count: item.stock });
      }
      return acc;
    }, []);
    
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard - COMPURSATIL</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Valor Inventario</p>
                <p className="text-xl font-bold text-blue-600">S/. {totalInventoryValue.toLocaleString('es-PE')}</p>
              </div>
              <Package className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Ventas Totales</p>
                <p className="text-xl font-bold text-green-600">S/. {totalSalesValue.toLocaleString('es-PE')}</p>
              </div>
              <ShoppingBag className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Clientes</p>
                <p className="text-xl font-bold text-purple-600">{customers.length}</p>
              </div>
              <Users className="text-purple-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Alertas Stock</p>
                <p className="text-xl font-bold text-orange-600">{lowStockItems}</p>
              </div>
              <AlertTriangle className="text-orange-500" size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2 flex items-center gap-1">
              <BarChart2 size={16} />
              Ventas por Mes
            </h3>
            <div className="h-48 flex items-end justify-between">
              {salesData.slice(0, 4).map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-8 bg-blue-500 rounded-t" style={{height: `${(data.sales / 45000) * 100}%`}}></div>
                  <span className="text-xs mt-1">{data.month}</span>
                </div>
              ))}
              {salesData.slice(4, 8).map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-8 bg-green-500 rounded-t" style={{height: `${(data.sales / 45000) * 100}%`}}></div>
                  <span className="text-xs mt-1">{data.month}</span>
                </div>
              ))}
              {salesData.slice(8, 12).map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-8 bg-purple-500 rounded-t" style={{height: `${(data.sales / 45000) * 100}%`}}></div>
                  <span className="text-xs mt-1">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2 flex items-center gap-1">
              <PieChart size={16} />
              Distribución de Marcas
            </h3>
            <div className="space-y-2">
              {productDistribution.map((brandData, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full" 
                      style={{width: `${(brandData.count / inventory.reduce((sum, i) => sum + i.stock, 0)) * 100}%`}}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{brandData.brand}</span>
                  <span className="text-sm text-gray-600">{brandData.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Últimas Ventas</h3>
            <div className="space-y-3">
              {recentSales.map(sale => (
                <div key={sale.id} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                  <div className="bg-green-100 p-1 rounded-full">
                    <ShoppingBag size={12} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{sale.customer}</p>
                    <p className="text-xs text-gray-600">
                      {sale.documentType}: {sale.documentNumber} • S/. {sale.total.toLocaleString('es-PE')} • {sale.date} {sale.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Casos Técnicos Recientes</h3>
            <div className="space-y-3">
              {recentTechCases.map(caseItem => (
                <div key={caseItem.id} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                  <div className="bg-orange-100 p-1 rounded-full">
                    <Wrench size={12} className="text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{caseItem.equipmentModel}</p>
                    <p className="text-xs text-gray-600">
                      {caseItem.status} • {caseItem.date} • {caseItem.technician}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const InventoryModule = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
      brand: '',
      model: '',
      serial: '',
      ram: '',
      storage: '',
      processor: '',
      gpu: '',
      screen: '',
      os: '',
      status: 'Nuevo',
      supplier: '',
      cost: '',
      price: '',
      stock: '',
      image: ''
    });

    const brands = [...new Set(inventory.map(item => item.brand))];
    const filteredInventory = inventory.filter(item =>
      (!selectedBrand || item.brand === selectedBrand) &&
      (item.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingItem) {
        updateInventoryItem({ ...editingItem, ...formData });
        setEditingItem(null);
      } else {
        addInventoryItem(formData);
      }
      setFormData({
        brand: '',
        model: '',
        serial: '',
        ram: '',
        storage: '',
        processor: '',
        gpu: '',
        screen: '',
        os: '',
        status: 'Nuevo',
        supplier: '',
        cost: '',
        price: '',
        stock: '',
        image: ''
      });
      setShowAddForm(false);
    };

    const handleEdit = (item) => {
      setEditingItem(item);
      setFormData({
        brand: item.brand,
        model: item.model,
        serial: item.serial,
        ram: item.ram,
        storage: item.storage,
        processor: item.processor,
        gpu: item.gpu || '',
        screen: item.screen || '',
        os: item.os || '',
        status: item.status,
        supplier: item.supplier,
        cost: item.cost,
        price: item.price,
        stock: item.stock,
        image: item.image
      });
      setShowAddForm(true);
    };

    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Gestión de Inventario - COMPURSATIL</h2>
          <button 
            onClick={() => {
              setShowAddForm(true);
              setEditingItem(null);
              setFormData({
                brand: '',
                model: '',
                serial: '',
                ram: '',
                storage: '',
                processor: '',
                gpu: '',
                screen: '',
                os: '',
                status: 'Nuevo',
                supplier: '',
                cost: '',
                price: '',
                stock: '',
                image: ''
              });
            }}
            className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1 hover:bg-blue-700"
          >
            <Plus size={14} />
            Nuevo Equipo
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Buscar por número de serie, marca, modelo o estado..."
              className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">Todas las marcas</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">
                    {editingItem ? 'Editar Equipo' : 'Registrar Nuevo Equipo'}
                  </h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    name="brand"
                    placeholder="Marca"
                    className="border p-1.5 rounded text-sm"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    name="model"
                    placeholder="Modelo"
                    className="border p-1.5 rounded text-sm"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    name="serial"
                    placeholder="Número de Serie"
                    className="border p-1.5 rounded text-sm"
                    value={formData.serial}
                    onChange={handleInputChange}
                    required
                  />
                  <select
                    name="ram"
                    className="border p-1.5 rounded text-sm"
                    value={formData.ram}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar RAM</option>
                    {categories.ram.map(ram => (
                      <option key={ram} value={ram}>{ram}</option>
                    ))}
                  </select>
                  <select
                    name="storage"
                    className="border p-1.5 rounded text-sm"
                    value={formData.storage}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar Almacenamiento</option>
                    {categories.storage.map(storage => (
                      <option key={storage} value={storage}>{storage}</option>
                    ))}
                  </select>
                  <select
                    name="processor"
                    className="border p-1.5 rounded text-sm"
                    value={formData.processor}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar Procesador</option>
                    {categories.processor.map(processor => (
                      <option key={processor} value={processor}>{processor}</option>
                    ))}
                  </select>
                  <select
                    name="gpu"
                    className="border p-1.5 rounded text-sm"
                    value={formData.gpu}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar Tarjeta de Video</option>
                    {categories.gpu.map(gpu => (
                      <option key={gpu} value={gpu}>{gpu}</option>
                    ))}
                  </select>
                  <select
                    name="screen"
                    className="border p-1.5 rounded text-sm"
                    value={formData.screen}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar Tamaño de Pantalla</option>
                    {categories.screen.map(screen => (
                      <option key={screen} value={screen}>{screen}</option>
                    ))}
                  </select>
                  <select
                    name="os"
                    className="border p-1.5 rounded text-sm"
                    value={formData.os}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar Sistema Operativo</option>
                    {categories.os.map(os => (
                      <option key={os} value={os}>{os}</option>
                    ))}
                  </select>
                  <select
                    name="status"
                    className="border p-1.5 rounded text-sm"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Nuevo">Nuevo</option>
                    <option value="Reacondicionado">Reacondicionado</option>
                    <option value="En diagnóstico">En diagnóstico</option>
                    <option value="En reparación">En reparación</option>
                  </select>
                  <input
                    name="supplier"
                    placeholder="Proveedor"
                    className="border p-1.5 rounded text-sm"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    name="cost"
                    placeholder="Costo de adquisición (S/.)"
                    type="number"
                    step="0.01"
                    className="border p-1.5 rounded text-sm"
                    value={formData.cost}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    name="price"
                    placeholder="Precio de venta sugerido (S/.)"
                    type="number"
                    step="0.01"
                    className="border p-1.5 rounded text-sm"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    name="stock"
                    placeholder="Stock disponible"
                    type="number"
                    className="border p-1.5 rounded text-sm"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Imagen del equipo
                    </label>
                    <div className="flex items-center gap-2">
                      {formData.image && (
                        <img 
                          src={formData.image} 
                          alt="Equipo" 
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="border p-1 rounded text-xs"
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 flex gap-2 mt-2">
                    <button type="submit" className="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700">
                      {editingItem ? 'Actualizar' : 'Guardar'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipo</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especificaciones</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precios (S/.)</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Ingreso</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">
                    <img 
                      src={item.image} 
                      alt={`${item.brand} ${item.model}`}
                      className="w-10 h-8 object-cover rounded"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/40x32/cccccc/666666?text=No+Image';
                      }}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <div>
                      <p className="font-medium">{item.brand} {item.model}</p>
                      <p className="text-gray-500">S/N: {item.serial}</p>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-gray-500">
                    <div>{item.ram}</div>
                    <div>{item.storage}</div>
                    <div>{item.processor}</div>
                    {item.gpu && <div>GPU: {item.gpu}</div>}
                    {item.screen && <div>Pantalla: {item.screen}</div>}
                    {item.os && <div>SO: {item.os}</div>}
                  </td>
                  <td className="px-3 py-2">
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                      item.status === 'Nuevo' ? 'bg-green-100 text-green-800' :
                      item.status === 'Reacondicionado' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-medium">{item.stock}</td>
                  <td className="px-3 py-2">
                    <div className="text-xs">
                      <div className="text-gray-500">Costo: S/. {item.cost.toLocaleString('es-PE')}</div>
                      <div className="font-medium">Venta: S/. {item.price.toLocaleString('es-PE')}</div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-gray-500">{item.addedDate}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => deleteInventoryItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const SalesModule = () => {
    const [filterDate, setFilterDate] = useState('');
    const [showSaleForm, setShowSaleForm] = useState(false);
    const [editingSale, setEditingSale] = useState(null);
    const [saleFormData, setSaleFormData] = useState({
      customerId: '',
      customerName: '',
      customerDocument: '',
      customerPhone: '',
      customerEmail: '',
      customerDocumentType: 'DNI',
      items: [],
      payment: 'Efectivo',
      documentType: 'Boleta',
      documentNumber: '',
      date: currentDate.toISOString().split('T')[0],
      time: currentDate.toLocaleTimeString(),
      observations: ''
    });
    const [showProductSelector, setShowProductSelector] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategoryFilters, setSelectedCategoryFilters] = useState({});
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
    const [customerFormData, setCustomerFormData] = useState({
      name: '',
      document: '',
      phone: '',
      email: '',
      documentType: 'DNI'
    });
    const [showExtraModal, setShowExtraModal] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

    const filteredSales = sales.filter(sale =>
      !filterDate || sale.date === filterDate
    );

    const getFilteredProducts = () => {
      return inventory.filter(item => {
        if (selectedBrand && item.brand !== selectedBrand) return false;
        for (const [category, value] of Object.entries(selectedCategoryFilters)) {
          if (value && item[category] !== value) return false;
        }
        return item.stock > 0;
      });
    };

    
    const handleAddProducts = (productsParam = null) => {
      const productsToAdd = productsParam || selectedProducts;
      const newItems = productsToAdd.map(product => ({
        id: product.id,
        quantity: 1,
        price: product.price,
        subtotal: calculateIGV(product.price).subtotal,
        igv: calculateIGV(product.price).igv,
        extras: []
      }));
      
      setSaleFormData(prev => ({
        ...prev,
        items: [...prev.items, ...newItems]
      }));
      
      // Close selector and reset filters/selection
      setShowProductSelector(false);
      setSelectedProducts([]);
      setSelectedBrand('');
      setSelectedCategoryFilters({});
    };


    const updateItemPrice = (index, newPrice) => {
      const updatedItems = [...saleFormData.items];
      updatedItems[index] = {
        ...updatedItems[index],
        price: parseFloat(newPrice),
        ...calculateIGV(parseFloat(newPrice))
      };
      setSaleFormData(prev => ({ ...prev, items: updatedItems }));
    };

    const removeItem = (index) => {
      const updatedItems = [...saleFormData.items];
      updatedItems.splice(index, 1);
      setSaleFormData(prev => ({ ...prev, items: updatedItems }));
    };

    const addExtraToItem = (itemIndex, extra) => {
      const updatedItems = [...saleFormData.items];
      const currentItem = updatedItems[itemIndex];
      
      // Add extra to item
      const newExtras = [...(currentItem.extras || []), extra];
      const newPrice = (currentItem.price || 0) + extra.price;
      
      updatedItems[itemIndex] = {
        ...currentItem,
        price: newPrice,
        extras: newExtras,
        ...calculateIGV(newPrice)
      };
      
      // Recalculate total
      const newTotal = updatedItems.reduce((sum, it) => sum + (it.price || 0), 0);
      setSaleFormData(prev => ({ ...prev, items: updatedItems, total: newTotal }));
    };

    const removeExtraFromItem = (itemIndex, extraIndex) => {
      const updatedItems = [...saleFormData.items];
      const currentItem = updatedItems[itemIndex];
      
      // Remove extra from item
      const removedExtra = currentItem.extras[extraIndex];
      const newExtras = currentItem.extras.filter((_, idx) => idx !== extraIndex);
      const newPrice = (currentItem.price || 0) - (removedExtra?.price || 0);
      
      updatedItems[itemIndex] = {
        ...currentItem,
        price: newPrice,
        extras: newExtras,
        ...calculateIGV(newPrice)
      };
      
      // Recalculate total
      const newTotal = updatedItems.reduce((sum, it) => sum + (it.price || 0), 0);
      setSaleFormData(prev => ({ ...prev, items: updatedItems, total: newTotal }));
    };

    const handleAddCustomer = (e) => {
      e.preventDefault();
      const newCustomer = {
        name: customerFormData.name,
        document: customerFormData.document,
        phone: customerFormData.phone,
        email: customerFormData.email,
        documentType: customerFormData.documentType
      };
      
      const createdCustomer = addCustomer(newCustomer);
      setSaleFormData(prev => ({
        ...prev,
        customerId: createdCustomer.id.toString(),
        customerName: createdCustomer.name,
        customerDocument: createdCustomer.document,
        customerPhone: createdCustomer.phone,
        customerEmail: createdCustomer.email,
        customerDocumentType: createdCustomer.documentType
      }));
      
      setCustomerFormData({
        name: '',
        document: '',
        phone: '',
        email: '',
        documentType: 'DNI'
      });
      // Don't close the main form, just close the customer modal
    };

    const handleAddSale = (e) => {
      e.preventDefault();
      if (saleFormData.customerId && saleFormData.items.length > 0) {
        // Validate document number
        if (!saleFormData.documentNumber) {
          saleFormData.documentNumber = generateDocumentNumber(saleFormData.documentType);
        } else {
          const isValid = validateDocumentNumber(saleFormData.documentType, saleFormData.documentNumber, editingSale ? editingSale.id : null);
          if (!isValid) {
            alert(`El número de ${saleFormData.documentType} "${saleFormData.documentNumber}" ya existe. Por favor, ingrese un número diferente.`);
            return;
          }
        }
        
        const customer = customers.find(c => c.id === parseInt(saleFormData.customerId));
        const total = saleFormData.items.reduce((sum, item) => sum + item.price, 0);
        
        const newSale = {
          ...saleFormData,
          customer: customer.name,
          total,
          documentNumber: saleFormData.documentNumber
        };
        
        if (editingSale) {
          updateSale({
            ...editingSale,
            ...newSale
          });
        } else {
          addSale(newSale);
        }
        
        setSaleFormData({
          customerId: '',
          customerName: '',
          customerDocument: '',
          customerPhone: '',
          customerEmail: '',
          customerDocumentType: 'DNI',
          items: [],
          payment: 'Efectivo',
          documentType: 'Boleta',
          documentNumber: '',
          date: currentDate.toISOString().split('T')[0],
          time: currentDate.toLocaleTimeString(),
          observations: ''
        });
        setShowSaleForm(false);
        setEditingSale(null);
      }
    };

    const handleEditSale = (sale) => {
      setEditingSale(sale);
      setSaleFormData({
        customerId: sale.customerId?.toString() || '',
        customerName: sale.customer,
        customerDocument: customers.find(c => c.id === sale.customerId)?.document || '',
        customerPhone: customers.find(c => c.id === sale.customerId)?.phone || '',
        customerEmail: customers.find(c => c.id === sale.customerId)?.email || '',
        customerDocumentType: customers.find(c => c.id === sale.customerId)?.documentType || 'DNI',
        items: sale.items,
        payment: sale.payment,
        documentType: sale.documentType || 'Boleta',
        documentNumber: sale.documentNumber,
        date: sale.date,
        time: sale.time,
        observations: sale.observations || ''
      });
      setShowSaleForm(true);
    };

    const handleViewReceipt = (sale) => {
      setSelectedSaleForReceipt(sale);
      setShowReceiptPreview(true);
    };

    const openExtraModal = (itemIndex) => {
      setSelectedItemIndex(itemIndex);
      setShowExtraModal(true);
    };

    const ReceiptPreview = ({ sale, onClose }) => {
      const customer = customers.find(c => c.id === parseInt(sale.customerId));
      
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-4">
              {/* A4 Format Receipt - 210mm x 297mm */}
              <div className="bg-white p-6 border border-gray-300 mx-auto" style={{ width: '230mm', minHeight: '297mm' }}>
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold text-blue-800">{receiptConfig.companyName}</h2>
                  <p className="text-sm text-gray-600">{receiptConfig.address}</p>
                  <p className="text-sm text-gray-600">Teléfono: {receiptConfig.phone}</p>
                  <p className="text-sm text-gray-600 mt-1">RUC: {receiptConfig.ruc}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <p><strong>Cliente:</strong> {sale.customer}</p>
                    <p><strong>{customer?.documentType === 'RUC' ? 'RUC' : 'DNI'}:</strong> {customer?.document || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p><strong>Fecha:</strong> {sale.date}</p>
                    <p><strong>Hora:</strong> {sale.time}</p>
                    <p><strong>{sale.documentType}:</strong> {sale.documentNumber}</p>
                  </div>
                </div>
                
                <div className="border-t border-b py-1 mb-3">
                  <div className="grid grid-cols-12 gap-1 text-xs font-semibold text-gray-700">
                    <div className="col-span-2">Cant.</div>
                    <div className="col-span-4">Descripción</div>
                    <div className="col-span-2 text-right">P.U.</div>
                    <div className="col-span-2 text-right">Subtotal</div>
                    <div className="col-span-2 text-right">IGV</div>
                  </div>
                </div>
                
                <div className="space-y-1 mb-3">
                  {sale.items.map((item, index) => {
                    const invItem = inventory.find(i => i.id === item.id);
                    return (
                      <div key={index} className="grid grid-cols-12 gap-1 text-sm">
                        <div className="col-span-2">{item.quantity}</div>
                        <div className="col-span-4">
                          {invItem?.brand} {invItem?.model}
                          <div className="text-xs text-gray-500">
                            {invItem?.processor} • {invItem?.ram}
                          </div>
                          {item.extras && item.extras.length > 0 && (
                            <div className="mt-0.5 text-xs text-gray-600">
                              Extras: {item.extras.map(extra => extra.name).join(', ')}
                            </div>
                          )}
                        </div>
                        <div className="col-span-2 text-right">S/. {item.price.toLocaleString('es-PE')}</div>
                        <div className="col-span-2 text-right">S/. {item.subtotal.toLocaleString('es-PE')}</div>
                        <div className="col-span-2 text-right">S/. {item.igv.toLocaleString('es-PE')}</div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="border-t pt-2">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p><strong>Total Subtotal:</strong> S/. {sale.items.reduce((sum, item) => sum + item.subtotal, 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}</p>
                      <p><strong>Total IGV (18%):</strong> S/. {sale.items.reduce((sum, item) => sum + item.igv, 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}</p>
                      {sale.observations && (
                        <div className="mt-1">
                          <p><strong>Observaciones:</strong> {sale.observations}</p>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold">TOTAL: S/. {sale.total.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center text-xs text-gray-500">
                  <p>Gracias por su compra</p>
                  <p>Garantía: 12 meses</p>
                  <p className="mt-2">COMPURSATIL IMPORTACIONES - Av. Francisco Bolognesi 376</p>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-2 bg-gray-50 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  window.print();
                  onClose();
                }}
                className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Imprimir
              </button>
            </div>
          </div>
        </div>
      );
    };

    const ExtraModal = () => {
      if (selectedItemIndex === -1) return null;
      
      const item = saleFormData.items[selectedItemIndex];
      
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded shadow-xl max-w-md w-full">
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Agregar Extra</h3>
                <button
                  onClick={() => setShowExtraModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {extraComponents.map(extra => (
                  <div key={extra.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <span className="text-sm">{extra.name}</span>
                      <span className="text-sm ml-1 text-gray-600">(+S/. {extra.price})</span>
                    </div>
                    <button
                      onClick={() => {
                        addExtraToItem(selectedItemIndex, extra);
                        setShowExtraModal(false);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      <PlusCircle size={16} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-3">
                <button
                  onClick={() => setShowExtraModal(false)}
                  className="w-full bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-400"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Gestión de Ventas - COMPURSATIL</h2>
          <button 
            onClick={() => {
              setShowSaleForm(true);
              setEditingSale(null);
              setSaleFormData({
                customerId: '',
                customerName: '',
                customerDocument: '',
                customerPhone: '',
                customerEmail: '',
                customerDocumentType: 'DNI',
                items: [],
                payment: 'Efectivo',
                documentType: 'Boleta',
                documentNumber: '',
                date: currentDate.toISOString().split('T')[0],
                time: currentDate.toLocaleTimeString(),
                observations: ''
              });
            }}
            className="bg-green-600 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1 hover:bg-green-700"
          >
            <Plus size={14} />
            Nueva Venta
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <div className="relative">
            <Calendar className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
            <input
              type="date"
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent text-sm"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
        </div>

        {showSaleForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">
                    {editingSale ? 'Editar Venta' : 'Registrar Nueva Venta'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowSaleForm(false);
                      setEditingSale(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleAddSale} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Cliente
                      </label>
                      <div className="flex gap-1">
                        <select
                          value={saleFormData.customerId}
                          onChange={(e) => {
                            const customerId = e.target.value;
                            setSaleFormData(prev => ({
                              ...prev,
                              customerId,
                              customerName: '',
                              customerDocument: '',
                              customerPhone: '',
                              customerEmail: '',
                              customerDocumentType: 'DNI'
                            }));
                            
                            if (customerId) {
                              const customer = customers.find(c => c.id === parseInt(customerId));
                              if (customer) {
                                setSaleFormData(prev => ({
                                  ...prev,
                                  customerName: customer.name,
                                  customerDocument: customer.document,
                                  customerPhone: customer.phone,
                                  customerEmail: customer.email,
                                  customerDocumentType: customer.documentType
                                }));
                              }
                            }
                          }}
                          className="border p-1.5 rounded w-full text-sm"
                          required
                        >
                          <option value="">Seleccionar cliente</option>
                          {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddCustomerForm(true);
                            setCustomerFormData({
                              name: '',
                              document: '',
                              phone: '',
                              email: '',
                              documentType: 'DNI'
                            });
                          }}
                          className="bg-blue-600 text-white px-2 py-1.5 rounded text-sm hover:bg-blue-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Documento del Cliente
                      </label>
                      <input
                        type="text"
                        value={saleFormData.customerDocument}
                        onChange={(e) => setSaleFormData({...saleFormData, customerDocument: e.target.value})}
                        className="border p-1.5 rounded w-full text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Nombre del Cliente
                      </label>
                      <input
                        type="text"
                        value={saleFormData.customerName}
                        onChange={(e) => setSaleFormData({...saleFormData, customerName: e.target.value})}
                        className="border p-1.5 rounded w-full text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="text"
                        value={saleFormData.customerPhone}
                        onChange={(e) => setSaleFormData({...saleFormData, customerPhone: e.target.value})}
                        className="border p-1.5 rounded w-full text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        value={saleFormData.customerEmail}
                        onChange={(e) => setSaleFormData({...saleFormData, customerEmail: e.target.value})}
                        className="border p-1.5 rounded w-full text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Tipo de Documento
                      </label>
                      <select
                        value={saleFormData.customerDocumentType}
                        onChange={(e) => setSaleFormData({...saleFormData, customerDocumentType: e.target.value})}
                        className="border p-1.5 rounded w-full text-sm"
                        required
                      >
                        <option value="DNI">DNI</option>
                        <option value="RUC">RUC</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="border rounded p-2">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-sm">Productos Seleccionados</h4>
                      <button
                        type="button"
                        onClick={() => setShowProductSelector(true)}
                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                      >
                        Agregar Productos
                      </button>
                    </div>
                    {saleFormData.items.length > 0 ? (
                      <div className="space-y-2">
                        {saleFormData.items.map((item, index) => {
                          const invItem = inventory.find(i => i.id === item.id);
                          return (
                            <div key={index} className="border rounded p-2 bg-gray-50">
                              <div className="grid grid-cols-12 gap-1 items-center">
                                <div className="col-span-3 font-medium text-sm">
                                  {invItem?.brand} {invItem?.model}
                                </div>
                                <div className="col-span-2">
                                  <input
                                    type="number"
                                    min="1"
                                    max={inventory.find(i => i.id === item.id)?.stock || 1}
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const updatedItems = [...saleFormData.items];
                                      updatedItems[index] = {
                                        ...updatedItems[index],
                                        quantity: parseInt(e.target.value) || 1
                                      };
                                      setSaleFormData(prev => ({ ...prev, items: updatedItems }));
                                    }}
                                    className="w-full border rounded p-0.5 text-xs"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={item.price}
                                    onChange={(e) => updateItemPrice(index, e.target.value)}
                                    className="w-full border rounded p-0.5 text-xs"
                                  />
                                </div>
                                <div className="col-span-2 text-right text-xs">
                                  <div>S/. {item.subtotal.toLocaleString('es-PE')}</div>
                                  <div className="text-gray-600">Subtotal</div>
                                </div>
                                <div className="col-span-2 text-right text-xs">
                                  <div>S/. {item.igv.toLocaleString('es-PE')}</div>
                                  <div className="text-gray-600">IGV</div>
                                </div>
                                <div className="col-span-1 text-right">
                                  <button
                                    type="button"
                                    onClick={() => removeItem(index)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                              
                              {/* Extras section */}
                              <div className="mt-1">
                                <div className="flex items-center gap-1 mb-1">
                                  <span className="text-xs font-medium">Extras:</span>
                                  <button
                                    type="button"
                                    onClick={() => openExtraModal(index)}
                                    className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs hover:bg-blue-700"
                                  >
                                    +
                                  </button>
                                </div>
                                
                                {item.extras && item.extras.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {item.extras.map((extra, extraIndex) => (
                                      <div key={extraIndex} className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                        <span>{extra.name}</span>
                                        <button
                                          type="button"
                                          onClick={() => removeExtraFromItem(index, extraIndex)}
                                          className="text-blue-800 hover:text-blue-900"
                                        >
                                          <MinusCircle size={10} />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-xs">No hay productos seleccionados</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Fecha y Hora
                      </label>
                      <div className="flex gap-1">
                        <input
                          type="date"
                          value={saleFormData.date}
                          onChange={(e) => setSaleFormData({...saleFormData, date: e.target.value})}
                          className="border p-1.5 rounded w-full text-sm"
                          required
                        />
                        <input
                          type="time"
                          value={saleFormData.time}
                          onChange={(e) => setSaleFormData({...saleFormData, time: e.target.value})}
                          className="border p-1.5 rounded w-full text-sm"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Tipo de Documento
                      </label>
                      <select
                        value={saleFormData.documentType}
                        onChange={(e) => {
                          const newType = e.target.value;
                          setSaleFormData(prev => ({
                            ...prev,
                            documentType: newType,
                            documentNumber: prev.documentNumber || generateDocumentNumber(newType)
                          }));
                        }}
                        className="border p-1.5 rounded w-full text-sm"
                        required
                      >
                        <option value="Boleta">Boleta</option>
                        <option value="Factura">Factura</option>
                        <option value="Proforma">Proforma</option>
                        <option value="Nota de Venta">Nota de Venta</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Número de Documento
                      </label>
                      <input
                        type="text"
                        value={saleFormData.documentNumber}
                        onChange={(e) => setSaleFormData({...saleFormData, documentNumber: e.target.value})}
                        className="border p-1.5 rounded w-full text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Método de Pago
                      </label>
                      <select
                        value={saleFormData.payment}
                        onChange={(e) => setSaleFormData({...saleFormData, payment: e.target.value})}
                        className="border p-1.5 rounded w-full text-sm"
                      >
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Yape">Yape</option>
                        <option value="Plin">Plin</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Observaciones
                    </label>
                    <textarea
                      value={saleFormData.observations}
                      onChange={(e) => setSaleFormData({...saleFormData, observations: e.target.value})}
                      className="border p-1.5 rounded w-full text-sm"
                      rows="2"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <button type="submit" className="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700">
                      {editingSale ? 'Actualizar Venta' : 'Registrar Venta'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setShowSaleForm(false);
                        setEditingSale(null);
                      }}
                      className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {showProductSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Seleccionar Productos</h3>
                  <button
                    onClick={() => setShowProductSelector(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Marca</label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full border p-1.5 rounded text-sm"
                    >
                      <option value="">Todas las marcas</option>
                      {[...new Set(inventory.map(item => item.brand))].map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                  
                  {Object.entries(categories).map(([category, options]) => (
                    <div key={category}>
                      <label className="block text-xs font-medium mb-1">
                        {category === 'processor' ? 'Procesador' :
                         category === 'ram' ? 'RAM' :
                         category === 'storage' ? 'Almacenamiento' :
                         category === 'gpu' ? 'Tarjeta de Video' :
                         category === 'screen' ? 'Pantalla' :
                         'Sistema Operativo'}
                      </label>
                      <select
                        value={selectedCategoryFilters[category] || ''}
                        onChange={(e) => setSelectedCategoryFilters({
                          ...selectedCategoryFilters,
                          [category]: e.target.value
                        })}
                        className="w-full border p-1.5 rounded text-sm"
                      >
                        <option value="">Todos</option>
                        {options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                  {getFilteredProducts().map(item => (
                    <div key={item.id} className="border rounded p-2 hover:shadow cursor-pointer" onClick={() => handleAddProducts([item])}>
                      <img 
                        src={item.image} 
                        alt={item.model}
                        className="w-full h-20 object-cover rounded mb-1"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/200x80/cccccc/666666?text=No+Image';
                        }}
                      />
                      <h4 className="font-medium text-sm">{item.brand} {item.model}</h4>
                      <p className="text-xs text-gray-600">S/N: {item.serial}</p>
                      <p className="text-xs text-green-600 font-medium">S/. {item.price.toLocaleString('es-PE')}</p>
                      <p className="text-xs text-gray-500">Stock: {item.stock}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="px-4 py-2 bg-gray-50 flex justify-end gap-2">
                <button
                  onClick={() => setShowProductSelector(false)}
                  className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddCustomerForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded shadow-xl max-w-md w-full">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Agregar Nuevo Cliente</h3>
                  <button
                    onClick={() => setShowAddCustomerForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleAddCustomer} className="space-y-2">
                  <input
                    placeholder="Nombres y apellidos / Razón Social"
                    className="border p-1.5 rounded w-full text-sm"
                    value={customerFormData.name}
                    onChange={(e) => setCustomerFormData({...customerFormData, name: e.target.value})}
                    required
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={customerFormData.documentType}
                      onChange={(e) => setCustomerFormData({...customerFormData, documentType: e.target.value})}
                      className="border p-1.5 rounded text-sm"
                    >
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                    </select>
                    <input
                      placeholder={customerFormData.documentType === 'DNI' ? 'Número de DNI' : 'Número de RUC'}
                      className="border p-1.5 rounded text-sm"
                      value={customerFormData.document}
                      onChange={(e) => setCustomerFormData({...customerFormData, document: e.target.value})}
                      required
                    />
                  </div>
                  <input
                    placeholder="Número de teléfono"
                    className="border p-1.5 rounded w-full text-sm"
                    value={customerFormData.phone}
                    onChange={(e) => setCustomerFormData({...customerFormData, phone: e.target.value})}
                    required
                  />
                  <input
                    placeholder="Correo electrónico"
                    className="border p-1.5 rounded w-full text-sm"
                    value={customerFormData.email}
                    onChange={(e) => setCustomerFormData({...customerFormData, email: e.target.value})}
                    required
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700">
                      Guardar Cliente
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowAddCustomerForm(false)}
                      className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {showExtraModal && <ExtraModal />}

        {showReceiptPreview && selectedSaleForReceipt && (
          <ReceiptPreview 
            sale={selectedSaleForReceipt} 
            onClose={() => setShowReceiptPreview(false)} 
          />
        )}

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productos</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendedor</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSales.map(sale => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">{sale.date} {sale.time}</td>
                  <td className="px-3 py-2 font-medium">{sale.customer}</td>
                  <td className="px-3 py-2">
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                      sale.documentType === 'Boleta' ? 'bg-blue-100 text-blue-800' :
                      sale.documentType === 'Factura' ? 'bg-green-100 text-green-800' :
                      sale.documentType === 'Proforma' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {sale.documentType}
                    </span>
                    <div className="text-xs text-gray-500">{sale.documentNumber}</div>
                  </td>
                  <td className="px-3 py-2 text-gray-500">
                    {sale.items.map(item => {
                      const invItem = inventory.find(i => i.id === item.id);
                      return `${invItem?.brand} ${invItem?.model} (${item.quantity})`;
                    }).join(', ')}
                  </td>
                  <td className="px-3 py-2">{sale.seller}</td>
                  <td className="px-3 py-2 font-medium text-green-600">S/. {sale.total.toLocaleString('es-PE')}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEditSale(sale)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => deleteSale(sale.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleViewReceipt(sale)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <FileText size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const CustomersModule = () => {
    const [showCustomerForm, setShowCustomerForm] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [customerFormData, setCustomerFormData] = useState({
      name: '',
      document: '',
      phone: '',
      email: '',
      documentType: 'DNI'
    });

    const handleAddCustomer = (e) => {
      e.preventDefault();
      if (editingCustomer) {
        updateCustomer({ ...editingCustomer, ...customerFormData });
        setEditingCustomer(null);
      } else {
        addCustomer(customerFormData);
      }
      setCustomerFormData({ name: '', document: '', phone: '', email: '', documentType: 'DNI' });
      setShowCustomerForm(false);
    };

    const handleEditCustomer = (customer) => {
      setEditingCustomer(customer);
      setCustomerFormData({
        name: customer.name,
        document: customer.document,
        phone: customer.phone,
        email: customer.email,
        documentType: customer.documentType
      });
      setShowCustomerForm(true);
    };

    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Gestión de Clientes - COMPURSATIL</h2>
          <button 
            onClick={() => {
              setShowCustomerForm(true);
              setEditingCustomer(null);
              setCustomerFormData({ name: '', document: '', phone: '', email: '', documentType: 'DNI' });
            }}
            className="bg-purple-600 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1 hover:bg-purple-700"
          >
            <Plus size={14} />
            Nuevo Cliente
          </button>
        </div>

        {showCustomerForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded shadow-xl max-w-md w-full">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">
                    {editingCustomer ? 'Editar Cliente' : 'Registrar Cliente'}
                  </h3>
                  <button
                    onClick={() => setShowCustomerForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleAddCustomer} className="space-y-2">
                  <input
                    placeholder="Nombres y apellidos / Razón Social"
                    className="border p-1.5 rounded w-full text-sm"
                    value={customerFormData.name}
                    onChange={(e) => setCustomerFormData({...customerFormData, name: e.target.value})}
                    required
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={customerFormData.documentType}
                      onChange={(e) => setCustomerFormData({...customerFormData, documentType: e.target.value})}
                      className="border p-1.5 rounded text-sm"
                    >
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                    </select>
                    <input
                      placeholder={customerFormData.documentType === 'DNI' ? 'Número de DNI' : 'Número de RUC'}
                      className="border p-1.5 rounded text-sm"
                      value={customerFormData.document}
                      onChange={(e) => setCustomerFormData({...customerFormData, document: e.target.value})}
                      required
                    />
                  </div>
                  <input
                    placeholder="Número de teléfono"
                    className="border p-1.5 rounded w-full text-sm"
                    value={customerFormData.phone}
                    onChange={(e) => setCustomerFormData({...customerFormData, phone: e.target.value})}
                    required
                  />
                  <input
                    placeholder="Correo electrónico"
                    className="border p-1.5 rounded w-full text-sm"
                    value={customerFormData.email}
                    onChange={(e) => setCustomerFormData({...customerFormData, email: e.target.value})}
                    required
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-purple-600 text-white px-3 py-1.5 rounded text-sm hover:bg-purple-700">
                      {editingCustomer ? 'Actualizar' : 'Guardar'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowCustomerForm(false)}
                      className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compras</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map(customer => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium">{customer.name}</td>
                  <td className="px-3 py-2">
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                      customer.documentType === 'DNI' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {customer.documentType}
                    </span>
                    <div className="text-sm">{customer.document}</div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1 mb-0.5">
                      <Phone size={12} className="text-gray-500" />
                      <span className="text-xs">{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail size={12} className="text-gray-500" />
                      <span className="text-xs">{customer.email}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    {sales.filter(sale => sale.customerId === customer.id).length}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEditCustomer(customer)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => deleteCustomer(customer.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const WarrantiesModule = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredWarranties = warranties.filter(warranty =>
      warranty.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customers.find(c => c.id === warranty.customerId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Gestión de Garantías - COMPURSATIL</h2>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Buscar por número de serie o cliente..."
              className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipo</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periodo</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Soporte Técnico</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWarranties.map(warranty => {
                const customer = customers.find(c => c.id === warranty.customerId);
                const technicalCase = technicalCases.find(tc => tc.serial === warranty.serial);
                return (
                  <tr key={warranty.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <p className="font-medium">S/N: {warranty.serial}</p>
                      <p className="text-gray-500">
                        {inventory.find(i => i.serial === warranty.serial)?.brand} {inventory.find(i => i.serial === warranty.serial)?.model}
                      </p>
                    </td>
                    <td className="px-3 py-2">{customer?.name || 'Cliente no encontrado'}</td>
                    <td className="px-3 py-2 text-gray-500">
                      <div>{warranty.startDate}</div>
                      <div className="text-gray-400">hasta {warranty.endDate}</div>
                    </td>
                    <td className="px-3 py-2">
                      <span className="px-1.5 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800">
                        {warranty.warrantyType}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                        warranty.status === 'Activa' ? 'bg-green-100 text-green-800' :
                        warranty.status === 'Vencida' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {warranty.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      {technicalCase ? (
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1">
                            <Clock size={12} className="text-gray-500" />
                            <span className="text-xs text-gray-600">{technicalCase.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                              technicalCase.status === 'Recibido' ? 'bg-blue-100 text-blue-800' :
                              technicalCase.status === 'En diagnóstico' ? 'bg-yellow-100 text-yellow-800' :
                              technicalCase.status === 'En reparación' ? 'bg-orange-100 text-orange-800' :
                              technicalCase.status === 'Reparado' ? 'bg-purple-100 text-purple-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {technicalCase.status}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600">
                            {technicalCase.technician}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">Sin soporte</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const TechnicalModule = () => {
    const [showCaseForm, setShowCaseForm] = useState(false);
    const [editingCase, setEditingCase] = useState(null);
    const [caseFormData, setCaseFormData] = useState({
      serial: '',
      customerId: '',
      equipmentModel: '',
      documentNumber: '',
      documentType: 'Boleta',
      issue: '',
      diagnosis: '',
      actions: '',
      status: 'Recibido',
      warrantyStartDate: '',
      supportType: 'Garantía'
    });

    const handleAddCase = (e) => {
      e.preventDefault();
      if (editingCase) {
        updateTechnicalCase({ ...editingCase, ...caseFormData });
        setEditingCase(null);
      } else {
        addTechnicalCase(caseFormData);
      }
      setCaseFormData({
        serial: '',
        customerId: '',
        equipmentModel: '',
        documentNumber: '',
        documentType: 'Boleta',
        issue: '',
        diagnosis: '',
        actions: '',
        status: 'Recibido',
        warrantyStartDate: '',
        supportType: 'Garantía'
      });
      setShowCaseForm(false);
    };

    const handleEditCase = (techCase) => {
      setEditingCase(techCase);
      setCaseFormData({
        serial: techCase.serial,
        customerId: techCase.customerId,
        equipmentModel: techCase.equipmentModel,
        documentNumber: techCase.documentNumber,
        documentType: techCase.documentType,
        issue: techCase.issue,
        diagnosis: techCase.diagnosis,
        actions: techCase.actions,
        status: techCase.status,
        warrantyStartDate: techCase.warrantyStartDate,
        supportType: techCase.supportType
      });
      setShowCaseForm(true);
    };

    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Soporte Técnico - COMPURSATIL</h2>
          <div className="flex gap-2">
            <button className="bg-orange-600 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1 hover:bg-orange-700">
              <BookOpen size={14} />
              Base de Conocimientos
            </button>
            <button 
              onClick={() => {
                setShowCaseForm(true);
                setEditingCase(null);
                setCaseFormData({
                  serial: '',
                  customerId: '',
                  equipmentModel: '',
                  documentNumber: '',
                  documentType: 'Boleta',
                  issue: '',
                  diagnosis: '',
                  actions: '',
                  status: 'Recibido',
                  warrantyStartDate: '',
                  supportType: 'Garantía'
                });
              }}
              className="bg-orange-600 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1 hover:bg-orange-700"
            >
              <Plus size={14} />
              Nuevo Caso
            </button>
          </div>
        </div>

        {showCaseForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">
                    {editingCase ? 'Editar Caso Técnico' : 'Registrar Caso Técnico'}
                  </h3>
                  <button
                    onClick={() => setShowCaseForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleAddCase} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      placeholder="Número de serie del equipo"
                      className="border p-1.5 rounded text-sm"
                      value={caseFormData.serial}
                      onChange={(e) => setCaseFormData({...caseFormData, serial: e.target.value})}
                      required
                    />
                    <select
                      className="border p-1.5 rounded text-sm"
                      value={caseFormData.customerId}
                      onChange={(e) => setCaseFormData({...caseFormData, customerId: e.target.value})}
                      required
                    >
                      <option value="">Seleccionar cliente</option>
                      {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      placeholder="Modelo del equipo"
                      className="border p-1.5 rounded text-sm"
                      value={caseFormData.equipmentModel}
                      onChange={(e) => setCaseFormData({...caseFormData, equipmentModel: e.target.value})}
                      required
                    />
                    <div className="grid grid-cols-2 gap-1">
                      <select
                        className="border p-1.5 rounded text-sm"
                        value={caseFormData.documentType}
                        onChange={(e) => setCaseFormData({...caseFormData, documentType: e.target.value})}
                      >
                        <option value="Boleta">Boleta</option>
                        <option value="Factura">Factura</option>
                        <option value="Proforma">Proforma</option>
                        <option value="Nota de Venta">Nota de Venta</option>
                      </select>
                      <input
                        placeholder="N° Documento"
                        className="border p-1.5 rounded text-sm"
                        value={caseFormData.documentNumber}
                        onChange={(e) => setCaseFormData({...caseFormData, documentNumber: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <select
                      className="border p-1.5 rounded text-sm"
                      value={caseFormData.supportType}
                      onChange={(e) => setCaseFormData({...caseFormData, supportType: e.target.value})}
                    >
                      <option value="Garantía">Garantía</option>
                      <option value="Particular">Particular</option>
                    </select>
                    {caseFormData.supportType === 'Garantía' && (
                      <input
                        type="date"
                        placeholder="Fecha inicio garantía"
                        className="border p-1.5 rounded text-sm"
                        value={caseFormData.warrantyStartDate}
                        onChange={(e) => setCaseFormData({...caseFormData, warrantyStartDate: e.target.value})}
                        required
                      />
                    )}
                  </div>
                  
                  <textarea
                    placeholder="Falla reportada por el cliente"
                    className="border p-1.5 rounded text-sm"
                    rows="2"
                    value={caseFormData.issue}
                    onChange={(e) => setCaseFormData({...caseFormData, issue: e.target.value})}
                    required
                  />
                  <textarea
                    placeholder="Diagnóstico técnico realizado"
                    className="border p-1.5 rounded text-sm"
                    rows="2"
                    value={caseFormData.diagnosis}
                    onChange={(e) => setCaseFormData({...caseFormData, diagnosis: e.target.value})}
                  />
                  <textarea
                    placeholder="Acciones/Reparaciones efectuadas"
                    className="border p-1.5 rounded text-sm"
                    rows="2"
                    value={caseFormData.actions}
                    onChange={(e) => setCaseFormData({...caseFormData, actions: e.target.value})}
                  />
                  <select
                    className="border p-1.5 rounded text-sm"
                    value={caseFormData.status}
                    onChange={(e) => setCaseFormData({...caseFormData, status: e.target.value})}
                  >
                    <option value="Recibido">Recibido</option>
                    <option value="En diagnóstico">En diagnóstico</option>
                    <option value="En reparación">En reparación</option>
                    <option value="Reparado">Reparado</option>
                    <option value="Entregado">Entregado</option>
                  </select>
                  
                  <div className="flex gap-2">
                    <button type="submit" className="bg-orange-600 text-white px-3 py-1.5 rounded text-sm hover:bg-orange-700">
                      {editingCase ? 'Actualizar Caso' : 'Registrar Caso'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowCaseForm(false)}
                      className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipo</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Falla</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnóstico</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Técnico</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {technicalCases.map(caseItem => {
                const customer = customers.find(c => c.id === caseItem.customerId);
                return (
                  <tr key={caseItem.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <p className="font-medium">S/N: {caseItem.serial}</p>
                      <p className="text-gray-500">{caseItem.equipmentModel}</p>
                    </td>
                    <td className="px-3 py-2">{customer?.name || 'Cliente no encontrado'}</td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                        caseItem.documentType === 'Boleta' ? 'bg-blue-100 text-blue-800' :
                        caseItem.documentType === 'Factura' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {caseItem.documentType}
                      </span>
                      <div className="text-xs text-gray-500">{caseItem.documentNumber}</div>
                    </td>
                    <td className="px-3 py-2 text-gray-600">{caseItem.issue}</td>
                    <td className="px-3 py-2 text-gray-600">{caseItem.diagnosis || 'Pendiente'}</td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                        caseItem.status === 'Recibido' ? 'bg-blue-100 text-blue-800' :
                        caseItem.status === 'En diagnóstico' ? 'bg-yellow-100 text-yellow-800' :
                        caseItem.status === 'En reparación' ? 'bg-orange-100 text-orange-800' :
                        caseItem.status === 'Reparado' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div>{caseItem.technician}</div>
                      <div className="text-xs text-gray-500">
                        {caseItem.supportType === 'Particular' ? 'Particular' : `Garantía desde ${caseItem.warrantyStartDate}`}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleEditCase(caseItem)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => deleteTechnicalCase(caseItem.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const SupportTrackingModule = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedTechnician, setSelectedTechnician] = useState('');

    const filteredCases = technicalCases.filter(caseItem => {
      const matchesSearch = 
        caseItem.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.equipmentModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.customerId && customers.find(c => c.id === caseItem.customerId)?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !selectedStatus || caseItem.status === selectedStatus;
      const matchesTechnician = !selectedTechnician || caseItem.technician === selectedTechnician;
      
      return matchesSearch && matchesStatus && matchesTechnician;
    });

    const technicians = [...new Set(technicalCases.map(caseItem => caseItem.technician))];

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Seguimiento de Soporte Técnico - COMPURSATIL</h2>
        
        <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Buscar por número de serie, modelo o cliente..."
              className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">Todos los estados</option>
            <option value="Recibido">Recibido</option>
            <option value="En diagnóstico">En diagnóstico</option>
            <option value="En reparación">En reparación</option>
            <option value="Reparado">Reparado</option>
            <option value="Entregado">Entregado</option>
          </select>
          
          <select
            value={selectedTechnician}
            onChange={(e) => setSelectedTechnician(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">Todos los técnicos</option>
            {technicians.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipo</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Falla</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnóstico</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Técnico</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observaciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCases.map(caseItem => {
                const customer = customers.find(c => c.id === caseItem.customerId);
                return (
                  <tr key={caseItem.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <p className="font-medium">S/N: {caseItem.serial}</p>
                      <p className="text-gray-500">{caseItem.equipmentModel}</p>
                    </td>
                    <td className="px-3 py-2">{customer?.name || 'Cliente no encontrado'}</td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                        caseItem.documentType === 'Boleta' ? 'bg-blue-100 text-blue-800' :
                        caseItem.documentType === 'Factura' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {caseItem.documentType}
                      </span>
                      <div className="text-xs text-gray-500">{caseItem.documentNumber}</div>
                    </td>
                    <td className="px-3 py-2 text-gray-600">{caseItem.issue}</td>
                    <td className="px-3 py-2 text-gray-600">{caseItem.diagnosis || 'Pendiente'}</td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                        caseItem.status === 'Recibido' ? 'bg-blue-100 text-blue-800' :
                        caseItem.status === 'En diagnóstico' ? 'bg-yellow-100 text-yellow-800' :
                        caseItem.status === 'En reparación' ? 'bg-orange-100 text-orange-800' :
                        caseItem.status === 'Reparado' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div>{caseItem.technician}</div>
                      <div className="text-xs text-gray-500">
                        {caseItem.supportType === 'Particular' ? 'Particular' : `Garantía desde ${caseItem.warrantyStartDate}`}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-gray-500">{caseItem.date}</td>
                    <td className="px-3 py-2 text-gray-600">
                      {caseItem.observations?.substring(0, 30)}{caseItem.observations?.length > 30 ? '...' : ''}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const ReportsModule = () => {
    const [startDate, setStartDate] = useState('2025-10-01');
    const [endDate, setEndDate] = useState('2025-10-06');
    const [reportType, setReportType] = useState('all');

    const filteredSales = sales.filter(sale => {
      const saleDate = new Date(sale.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return saleDate >= start && saleDate <= end;
    });

    const totalSalesValue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
    const totalSalesCount = filteredSales.length;
    const productsSold = {};
    
    filteredSales.forEach(sale => {
      sale.items.forEach(item => {
        if (!productsSold[item.id]) {
          productsSold[item.id] = { ...item, quantity: 0 };
        }
        productsSold[item.id].quantity += item.quantity;
      });
    });

    const topProducts = Object.values(productsSold)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    const salesByDay = {};
    filteredSales.forEach(sale => {
      const date = sale.date;
      if (!salesByDay[date]) {
        salesByDay[date] = { total: 0, count: 0 };
      }
      salesByDay[date].total += sale.total;
      salesByDay[date].count++;
    });

    const salesByPayment = {};
    filteredSales.forEach(sale => {
      if (!salesByPayment[sale.payment]) {
        salesByPayment[sale.payment] = { total: 0, count: 0 };
      }
      salesByPayment[sale.payment].total += sale.total;
      salesByPayment[sale.payment].count++;
    });

    const exportReport = () => {
      const content = `
        COMPURSATIL IMPORTACIONES
        Reporte de Ventas
        Del ${startDate} al ${endDate}
        
        Total Ventas: ${totalSalesCount}
        Valor Total: S/. ${totalSalesValue.toLocaleString('es-PE')}
        
        Productos Más Vendidos:
        ${topProducts.map(p => `${p.quantity} unidades de ${inventory.find(i => i.id === p.id)?.brand} ${inventory.find(i => i.id === p.id)?.model}`).join('\n        ')}
        
        Ventas por Día:
        ${Object.entries(salesByDay).map(([date, data]) => `${date}: ${data.count} ventas, S/. ${data.total.toLocaleString('es-PE')}`).join('\n        ')}
        
        Ventas por Método de Pago:
        ${Object.entries(salesByPayment).map(([method, data]) => `${method}: ${data.count} ventas, S/. ${data.total.toLocaleString('es-PE')}`).join('\n        ')}
      `;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte_ventas_${startDate}_a_${endDate}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Reportes - COMPURSATIL</h2>
        
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Fecha Inicio
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-1.5 rounded w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Fecha Fin
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-1.5 rounded w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tipo de Reporte
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="border p-1.5 rounded w-full text-sm"
            >
              <option value="all">Todos los datos</option>
              <option value="daily">Diario</option>
              <option value="byPayment">Por método de pago</option>
            </select>
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            onClick={exportReport}
            className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1 hover:bg-blue-700"
          >
            <Download size={14} />
            Exportar Reporte
          </button>
          <button
            onClick={() => {
              setStartDate('2025-10-01');
              setEndDate('2025-10-06');
              setReportType('all');
            }}
            className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm flex items-center gap-1 hover:bg-gray-400"
          >
            Limpiar Filtros
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2 flex items-center gap-1">
              <TrendingUp size={16} />
              Resumen General
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Ventas</span>
                <span className="font-medium">{totalSalesCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Valor Total</span>
                <span className="font-medium">S/. {totalSalesValue.toLocaleString('es-PE')}</span>
              </div>
              <div className="flex justify-between">
                <span>Promedio por Venta</span>
                <span className="font-medium">S/. {(totalSalesValue / totalSalesCount).toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Top 5 Productos</h3>
            <div className="space-y-2">
              {topProducts.map((product, index) => {
                const invItem = inventory.find(i => i.id === product.id);
                return (
                  <div key={product.id} className="flex justify-between">
                    <span>{index + 1}. {invItem?.brand} {invItem?.model}</span>
                    <span className="font-medium">{product.quantity} unidades</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Ventas por Día</h3>
            <div className="space-y-2">
              {Object.entries(salesByDay).map(([date, data]) => (
                <div key={date} className="flex justify-between">
                  <span>{date}</span>
                  <span className="font-medium">S/. {data.total.toLocaleString('es-PE')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Ventas por Método de Pago</h3>
            <div className="space-y-2">
              {Object.entries(salesByPayment).map(([method, data]) => (
                <div key={method} className="flex justify-between">
                  <span>{method}</span>
                  <span className="font-medium">S/. {data.total.toLocaleString('es-PE')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const UsersModule = () => {
    const [showUserForm, setShowUserForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userFormData, setUserFormData] = useState({
      name: '',
      username: '',
      password: '',
      role: 'Vendedor'
    });

    const handleAddUser = (e) => {
      e.preventDefault();
      if (editingUser) {
        const updatedUsers = users.map(user => 
          user.id === editingUser.id 
            ? { ...user, ...userFormData, password: userFormData.password || user.password }
            : user
        );
        setUsers(updatedUsers);
        setEditingUser(null);
      } else {
        // Validation for new users
        if (users.some(user => user.username === userFormData.username)) {
          alert('El nombre de usuario ya existe. Por favor, elija otro.');
          return;
        }
        
        const newUser = {
          ...userFormData,
          id: users.length + 1,
          status: 'Activo'
        };
        setUsers([...users, newUser]);
      }
      setUserFormData({ name: '', username: '', password: '', role: 'Vendedor' });
      setShowUserForm(false);
    };

    const handleEditUser = (user) => {
      setEditingUser(user);
      setUserFormData({
        name: user.name,
        username: user.username,
        password: '',
        role: user.role
      });
      setShowUserForm(true);
    };

    const handleDeleteUser = (id) => {
      if (window.confirm('¿Está seguro de eliminar este usuario?')) {
        setUsers(users.filter(user => user.id !== id));
      }
    };

    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Gestión de Usuarios - COMPURSATIL</h2>
          <button 
            onClick={() => {
              setShowUserForm(true);
              setEditingUser(null);
              setUserFormData({ name: '', username: '', password: '', role: 'Vendedor' });
            }}
            className="bg-red-600 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1 hover:bg-red-700"
          >
            <Plus size={14} />
            Nuevo Usuario
          </button>
        </div>

        {showUserForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded shadow-xl max-w-md w-full">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">
                    {editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                  </h3>
                  <button
                    onClick={() => setShowUserForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleAddUser} className="space-y-2">
                  <input
                    placeholder="Nombre completo"
                    className="border p-1.5 rounded w-full text-sm"
                    value={userFormData.name}
                    onChange={(e) => setUserFormData({...userFormData, name: e.target.value})}
                    required
                  />
                  <input
                    placeholder="Nombre de usuario"
                    className="border p-1.5 rounded w-full text-sm"
                    value={userFormData.username}
                    onChange={(e) => setUserFormData({...userFormData, username: e.target.value})}
                    required
                  />
                  <input
                    placeholder={editingUser ? "Nueva contraseña (opcional)" : "Contraseña"}
                    type="password"
                    className="border p-1.5 rounded w-full text-sm"
                    value={userFormData.password}
                    onChange={(e) => setUserFormData({...userFormData, password: e.target.value})}
                    required={!editingUser}
                  />
                  <select
                    className="border p-1.5 rounded w-full text-sm"
                    value={userFormData.role}
                    onChange={(e) => setUserFormData({...userFormData, role: e.target.value})}
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Técnico">Técnico</option>
                  </select>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700">
                      {editingUser ? 'Actualizar' : 'Crear Usuario'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowUserForm(false)}
                      className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium">@{user.username}</td>
                  <td className="px-3 py-2">{user.name}</td>
                  <td className="px-3 py-2">
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                      user.role === 'Administrador' ? 'bg-red-100 text-red-800' :
                      user.role === 'Vendedor' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                      user.status === 'Activo' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const CategoriesModule = () => {
    const [newCategory, setNewCategory] = useState({ type: 'processor', value: '' });
    const [newExtra, setNewExtra] = useState({ type: 'ram', value: '', price: 0 });

    const handleAddCategory = (e) => {
      e.preventDefault();
      if (newCategory.value.trim()) {
        addCategory(newCategory.type, newCategory.value.trim());
        setNewCategory({ type: 'processor', value: '' });
      }
    };

    const handleAddExtraComponent = (e) => {
      e.preventDefault();
      if (newExtra.value.trim() && newExtra.price >= 0) {
        const newExtraComponent = {
          name: newExtra.value,
          price: parseFloat(newExtra.price),
          category: newExtra.type
        };
        addExtraComponent(newExtraComponent);
        setNewExtra({ type: 'ram', value: '', price: 0 });
      }
    };

    const handleDeleteExtraComponent = (id) => {
      if (window.confirm('¿Está seguro de eliminar este componente extra?')) {
        setExtraComponents(extraComponents.filter(extra => extra.id !== id));
      }
    };

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Gestión de Categorías - COMPURSATIL</h2>
        
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-semibold mb-2">Agregar Nueva Categoría</h3>
          <form onSubmit={handleAddCategory} className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <select
              value={newCategory.type}
              onChange={(e) => setNewCategory({...newCategory, type: e.target.value})}
              className="border p-1.5 rounded text-sm"
            >
              <option value="processor">Procesador</option>
              <option value="ram">RAM</option>
              <option value="storage">Almacenamiento</option>
              <option value="gpu">Tarjeta de Video</option>
              <option value="screen">Pantalla</option>
              <option value="os">Sistema Operativo</option>
            </select>
            <div className="flex gap-1">
              <input
                placeholder="Nuevo valor de categoría"
                className="border p-1.5 rounded flex-1 text-sm"
                value={newCategory.value}
                onChange={(e) => setNewCategory({...newCategory, value: e.target.value})}
              />
              <button 
                type="submit"
                className="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-semibold mb-2">Agregar Componente Extra</h3>
          <form onSubmit={handleAddExtraComponent} className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <select
              value={newExtra.type}
              onChange={(e) => setNewExtra({...newExtra, type: e.target.value})}
              className="border p-1.5 rounded text-sm"
            >
              <option value="ram">RAM</option>
              <option value="storage">Almacenamiento</option>
              <option value="gpu">Tarjeta de Video</option>
            </select>
            <div className="flex gap-1">
              <input
                placeholder="Nombre del componente extra"
                className="border p-1.5 rounded flex-1 text-sm"
                value={newExtra.value}
                onChange={(e) => setNewExtra({...newExtra, value: e.target.value})}
              />
              <input
                type="number"
                placeholder="Precio"
                className="border p-1.5 rounded w-20 text-sm"
                value={newExtra.price}
                onChange={(e) => setNewExtra({...newExtra, price: e.target.value})}
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(categories).map(([category, values]) => (
            <div key={category} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2 text-sm">
                {category === 'processor' ? 'Procesadores' :
                 category === 'ram' ? 'RAM' :
                 category === 'storage' ? 'Almacenamiento' :
                 category === 'gpu' ? 'Tarjetas de Video' :
                 category === 'screen' ? 'Pantallas' :
                 'Sistemas Operativos'}
              </h3>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center justify-between p-1 bg-gray-50 rounded">
                    <span className="text-xs">{value}</span>
                    <button
                      onClick={() => deleteCategory(category, value)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Componentes Extra</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {extraComponents.map(extra => (
              <div key={extra.id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-sm">{extra.name}</h4>
                  <span className="text-sm font-bold">S/. {extra.price}</span>
                </div>
                <div className="text-xs text-gray-600">Categoría: {extra.category}</div>
                <button
                  onClick={() => handleDeleteExtraComponent(extra.id)}
                  className="mt-2 text-red-600 hover:text-red-800 text-xs"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ReceiptConfigModule = () => {
    const [config, setConfig] = useState(receiptConfig);

    const handleSaveConfig = (e) => {
      e.preventDefault();
      setReceiptConfig(config);
      alert('Configuración del recibo actualizada correctamente');
    };

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Configuración del Recibo - COMPURSATIL</h2>
        
        <div className="bg-white p-4 rounded shadow">
          <form onSubmit={handleSaveConfig} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Nombre de la Empresa
              </label>
              <input
                type="text"
                value={config.companyName}
                onChange={(e) => setConfig({...config, companyName: e.target.value})}
                className="w-full border p-1.5 rounded text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                value={config.address}
                onChange={(e) => setConfig({...config, address: e.target.value})}
                className="w-full border p-1.5 rounded text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="text"
                value={config.phone}
                onChange={(e) => setConfig({...config, phone: e.target.value})}
                className="w-full border p-1.5 rounded text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                RUC
              </label>
              <input
                type="text"
                value={config.ruc}
                onChange={(e) => setConfig({...config, ruc: e.target.value})}
                className="w-full border p-1.5 rounded text-sm"
                required
              />
            </div>
            
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700">
                Guardar Configuración
              </button>
              <button 
                type="button"
                onClick={() => setConfig(receiptConfig)}
                className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard />;
      case 'inventory': return <InventoryModule />;
      case 'sales': return <SalesModule />;
      case 'customers': return <CustomersModule />;
      case 'warranties': return <WarrantiesModule />;
      case 'technical': return <TechnicalModule />;
      case 'reports': return <ReportsModule />;
      case 'users': return <UsersModule />;
      case 'categories': return <CategoriesModule />;
      case 'receiptConfig': return <ReceiptConfigModule />;
      case 'supportTracking': return <SupportTrackingModule />;
      default: return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-30'}`}>
        {renderModule()}
      </main>
    </div>
  );
};

export default App;