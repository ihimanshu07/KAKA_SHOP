"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Edit,
  LogOut,
  Loader2,
  Package,
  X,
  Minus,
  ShoppingCart,
  Trash2,
  Check,
  ArrowUp,
  TrendingUp,
  Filter,
} from "lucide-react";

interface Sweet {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  createdAt: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sweetToDelete, setSweetToDelete] = useState<Sweet | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [restockDialogOpen, setRestockDialogOpen] = useState(false);
  const [sweetToRestock, setSweetToRestock] = useState<Sweet | null>(null);
  const [restockQuantity, setRestockQuantity] = useState("");
  const [restocking, setRestocking] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    category: "",
    maxPrice: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [purchaseMode, setPurchaseMode] = useState<Record<string, boolean>>({});
  const [purchaseQuantities, setPurchaseQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchSweets();
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUserRole(data.role);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/sweets");
      if (response.ok) {
        const data = await response.json();
        setSweets(data);
      }
    } catch (error) {
      console.error("Error fetching sweets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchFilters.name) params.append("name", searchFilters.name);
      if (searchFilters.category) params.append("category", searchFilters.category);
      if (searchFilters.maxPrice) params.append("maxPrice", searchFilters.maxPrice);

      const response = await fetch(`/api/sweets/search?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setSweets(data);
      }
    } catch (error) {
      console.error("Error searching sweets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          price: parseInt(formData.price),
          quantity: parseInt(formData.quantity),
        }),
      });

      if (response.ok) {
        setShowModal(false);
        setFormData({ name: "", category: "", price: "", quantity: "" });
        toast.success("Sweet created successfully!");
        fetchSweets();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to create sweet. Please try again.");
      }
    } catch (error) {
      console.error("Error creating sweet:", error);
      toast.error("Failed to create sweet. Please try again.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSweet) return;

    try {
      const updateData: any = {};
      if (formData.name) updateData.name = formData.name;
      if (formData.category) updateData.category = formData.category;
      if (formData.price) updateData.price = parseInt(formData.price);
      if (formData.quantity) updateData.quantity = parseInt(formData.quantity);

      const response = await fetch(`/api/sweets/${editingSweet.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        setShowModal(false);
        setEditingSweet(null);
        setFormData({ name: "", category: "", price: "", quantity: "" });
        toast.success("Sweet updated successfully!");
        fetchSweets();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to update sweet. Please try again.");
      }
    } catch (error) {
      console.error("Error updating sweet:", error);
      toast.error("Failed to update sweet. Please try again.");
    }
  };

  const openEditModal = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString(),
    });
    setShowModal(true);
  };

  const resetFilters = () => {
    setSearchFilters({ name: "", category: "", maxPrice: "" });
    fetchSweets();
  };

  const openDeleteDialog = (sweet: Sweet) => {
    setSweetToDelete(sweet);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!sweetToDelete) return;

    try {
      setDeleting(true);
      const response = await fetch(`/api/sweets/${sweetToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDeleteDialogOpen(false);
        setSweetToDelete(null);
        toast.success("Sweet deleted successfully!");
        fetchSweets();
      } else {
        const errorData = await response.json();
        console.error("Error deleting sweet:", errorData);
        if (response.status === 403) {
          toast.error("Access denied. Admin privileges required.");
        } else {
          toast.error(errorData.error || "Failed to delete sweet. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error deleting sweet:", error);
      toast.error("Failed to delete sweet. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handlePurchaseClick = (sweetId: string) => {
    setPurchaseMode((prev) => ({
      ...prev,
      [sweetId]: true,
    }));
    setPurchaseQuantities((prev) => ({
      ...prev,
      [sweetId]: 1,
    }));
  };

  const handleIncreaseQuantity = (sweetId: string, maxQuantity: number) => {
    setPurchaseQuantities((prev) => {
      const current = prev[sweetId] || 1;
      if (current < maxQuantity) {
        return {
          ...prev,
          [sweetId]: current + 1,
        };
      }
      return prev;
    });
  };

  const handleDecreaseQuantity = (sweetId: string) => {
    setPurchaseQuantities((prev) => {
      const current = prev[sweetId] || 1;
      if (current > 0) {
        const newQuantity = current - 1;
        if (newQuantity === 0) {
          setPurchaseMode((prevMode) => {
            const newMode = { ...prevMode };
            delete newMode[sweetId];
            return newMode;
          });
          const newQuantities = { ...prev };
          delete newQuantities[sweetId];
          return newQuantities;
        }
        return {
          ...prev,
          [sweetId]: newQuantity,
        };
      }
      return prev;
    });
  };

  const handlePurchaseConfirm = async (sweetId: string) => {
    const quantity = purchaseQuantities[sweetId] || 1;
    const sweet = sweets.find((s) => s.id === sweetId);
    
    if (!sweet) return;

    try {
      setPurchasing(true);
      const response = await fetch(`/api/sweets/${sweetId}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        setPurchaseMode((prev) => {
          const newMode = { ...prev };
          delete newMode[sweetId];
          return newMode;
        });
        setPurchaseQuantities((prev) => {
          const newQuantities = { ...prev };
          delete newQuantities[sweetId];
          return newQuantities;
        });
        toast.success(`Successfully purchased ${quantity} ${sweet.name}!`);
        fetchSweets();
      } else {
        const error = await response.json();
        console.error("Error purchasing sweet:", error);
        toast.error(error.error || "Failed to purchase sweet. Please try again.");
      }
    } catch (error) {
      console.error("Error purchasing sweet:", error);
      toast.error("Failed to purchase sweet. Please try again.");
    } finally {
      setPurchasing(false);
    }
  };

  const openRestockDialog = (sweet: Sweet) => {
    setSweetToRestock(sweet);
    setRestockQuantity("");
    setRestockDialogOpen(true);
  };

  const handleRestock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sweetToRestock || !restockQuantity) return;

    const quantity = parseInt(restockQuantity);
    if (quantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    try {
      setRestocking(true);
      const response = await fetch(`/api/sweets/${sweetToRestock.id}/restock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        setRestockDialogOpen(false);
        setSweetToRestock(null);
        setRestockQuantity("");
        toast.success("Sweet restocked successfully!");
        fetchSweets();
      } else {
        const errorData = await response.json();
        console.error("Error restocking sweet:", errorData);
        if (response.status === 403) {
          toast.error("Access denied. Admin privileges required.");
        } else {
          toast.error(errorData.error || "Failed to restock sweet. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error restocking sweet:", error);
      toast.error("Failed to restock sweet. Please try again.");
    } finally {
      setRestocking(false);
    }
  };

  const totalProducts = sweets.length;
  const totalValue = sweets.reduce((sum, sweet) => sum + (sweet.price * sweet.quantity), 0);
  const lowStock = sweets.filter(sweet => sweet.quantity < 10 && sweet.quantity > 0).length;
  const outOfStock = sweets.filter(sweet => sweet.quantity === 0).length;

  return (
    <div className="min-h-screen bg-[#FFE5E5]">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-[3px] border-black bg-[#FFE66D]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-[3px] border-black bg-[#FF6B6B] flex items-center justify-center neobrutalism-shadow-sm">
                <Package className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-black">
                  SHOP MANAGER
                </h1>
                <p className="text-sm font-bold text-black">
                  {session?.user?.name || "USER"}
                  {userRole && (
                    <span className={`ml-2 px-3 py-1 border-[2px] border-black text-xs font-black ${
                      userRole === "ADMIN" 
                        ? "bg-[#FF6B6B] text-white"
                        : "bg-[#4ECDC4] text-black"
                    }`}>
                      {userRole}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <Button
              onClick={() => signOut()}
              variant="ghost"
              size="sm"
              className="border-0 text-black hover:bg-[#FF6B6B] hover:text-white font-black"
            >
              <LogOut className="mr-2 h-4 w-4" />
              SIGN OUT
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-[3px] border-black bg-white neobrutalism-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-black mb-1">TOTAL PRODUCTS</p>
                  <p className="text-3xl font-black text-black">{totalProducts}</p>
                </div>
                <div className="w-14 h-14 border-[3px] border-black bg-[#45B7D1] flex items-center justify-center neobrutalism-shadow-sm">
                  <Package className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[3px] border-black bg-white neobrutalism-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-black mb-1">TOTAL VALUE</p>
                  <p className="text-3xl font-black text-black">₹{totalValue.toLocaleString()}</p>
                </div>
                <div className="w-14 h-14 border-[3px] border-black bg-[#4ECDC4] flex items-center justify-center neobrutalism-shadow-sm">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[3px] border-black bg-white neobrutalism-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-black mb-1">LOW STOCK</p>
                  <p className="text-3xl font-black text-[#FFA07A]">{lowStock}</p>
                </div>
                <div className="w-14 h-14 border-[3px] border-black bg-[#FFE66D] flex items-center justify-center neobrutalism-shadow-sm">
                  <TrendingUp className="h-7 w-7 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[3px] border-black bg-white neobrutalism-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-black mb-1">OUT OF STOCK</p>
                  <p className="text-3xl font-black text-[#FF6B6B]">{outOfStock}</p>
                </div>
                <div className="w-14 h-14 border-[3px] border-black bg-[#FF6B6B] flex items-center justify-center neobrutalism-shadow-sm">
                  <Package className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Card className="flex-1 border-[3px] border-black bg-white neobrutalism-shadow">
            <CardContent className="p-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
                  <Input
                    type="text"
                    placeholder="SEARCH BY NAME..."
                    value={searchFilters.name}
                    onChange={(e) =>
                      setSearchFilters({ ...searchFilters, name: e.target.value })
                    }
                    className="pl-10 border-[3px] border-black bg-white font-bold"
                  />
                </div>
                <Input
                  type="text"
                  placeholder="CATEGORY"
                  value={searchFilters.category}
                  onChange={(e) =>
                    setSearchFilters({ ...searchFilters, category: e.target.value })
                  }
                  className="w-40 border-[3px] border-black bg-white font-bold"
                />
                <Input
                  type="number"
                  placeholder="MAX PRICE"
                  value={searchFilters.maxPrice}
                  onChange={(e) =>
                    setSearchFilters({ ...searchFilters, maxPrice: e.target.value })
                  }
                  className="w-32 border-[3px] border-black bg-white font-bold"
                />
                <Button
                  onClick={handleSearch}
                  className="bg-[#4ECDC4] text-black border-[3px] border-black font-black"
                >
                  <Search className="mr-2 h-4 w-4" />
                  SEARCH
                </Button>
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  size="icon"
                  className="bg-white text-black border-[3px] border-black font-black"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {userRole === "ADMIN" && (
            <Button
              onClick={() => {
                setEditingSweet(null);
                setFormData({ name: "", category: "", price: "", quantity: "" });
                setShowModal(true);
              }}
              size="lg"
              className="bg-[#FF6B6B] text-white border-[3px] border-black h-12 px-6 font-black"
            >
              <Plus className="mr-2 h-5 w-5" />
              ADD PRODUCT
            </Button>
          )}
        </div>

        {/* Products Table */}
        <Card className="border-[3px] border-black bg-white neobrutalism-shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-black text-black">
              PRODUCTS INVENTORY
            </CardTitle>
            <CardDescription className="text-base font-bold text-black">
              MANAGE YOUR SWEETS INVENTORY
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-16 text-center">
                <Loader2 className="h-10 w-10 animate-spin text-[#FF6B6B] mx-auto mb-4" />
                <p className="text-base font-bold text-black">LOADING PRODUCTS...</p>
              </div>
            ) : sweets.length === 0 ? (
              <div className="p-16 text-center">
                <div className="w-24 h-24 border-[3px] border-black bg-[#FFE66D] flex items-center justify-center mx-auto mb-4 neobrutalism-shadow">
                  <Package className="h-12 w-12 text-black" />
                </div>
                <p className="text-xl font-black text-black mb-2">NO PRODUCTS FOUND</p>
                <p className="text-base font-bold text-black mb-6">GET STARTED BY ADDING YOUR FIRST PRODUCT</p>
                {userRole === "ADMIN" && (
                  <Button
                    onClick={() => {
                      setEditingSweet(null);
                      setFormData({ name: "", category: "", price: "", quantity: "" });
                      setShowModal(true);
                    }}
                    className="bg-[#FF6B6B] text-white border-[3px] border-black font-black"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    ADD YOUR FIRST PRODUCT
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b-[3px] border-black bg-[#FFE66D]">
                      <TableHead className="font-black text-black">PRODUCT</TableHead>
                      <TableHead className="font-black text-black">CATEGORY</TableHead>
                      <TableHead className="font-black text-black">PRICE</TableHead>
                      <TableHead className="font-black text-black">STOCK</TableHead>
                      <TableHead className="text-right font-black text-black">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sweets.map((sweet) => {
                      const isInPurchaseMode = purchaseMode[sweet.id];
                      const purchaseQty = purchaseQuantities[sweet.id] || 1;
                      const isOutOfStock = sweet.quantity === 0;

                      return (
                        <TableRow 
                          key={sweet.id}
                          className="border-b-[2px] border-black hover:bg-[#FFE66D] transition-colors"
                        >
                          <TableCell className="font-bold text-black">{sweet.name.toUpperCase()}</TableCell>
                          <TableCell className="font-bold text-black">{sweet.category.toUpperCase()}</TableCell>
                          <TableCell className="font-black text-[#FF6B6B]">₹{sweet.price}</TableCell>
                          <TableCell>
                            <span className={`px-4 py-2 border-[2px] border-black text-xs font-black ${
                              sweet.quantity === 0 
                                ? "bg-[#FF6B6B] text-white"
                                : sweet.quantity < 10
                                ? "bg-[#FFE66D] text-black"
                                : "bg-[#4ECDC4] text-black"
                            }`}>
                              {sweet.quantity} UNITS
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {isInPurchaseMode ? (
                              <div className="flex items-center justify-end gap-2">
                                <div className="flex items-center gap-2 border-[3px] border-black bg-[#FFE66D] px-3 py-1 neobrutalism-shadow-sm">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDecreaseQuantity(sweet.id)}
                                    className="h-7 w-7 border-0 hover:bg-[#FF6B6B] hover:text-white font-black"
                                    disabled={purchasing}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="min-w-[2rem] text-center font-black text-black">
                                    {purchaseQty}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleIncreaseQuantity(sweet.id, sweet.quantity)}
                                    disabled={purchaseQty >= sweet.quantity || purchasing}
                                    className="h-7 w-7 border-0 hover:bg-[#4ECDC4] hover:text-black font-black"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Button
                                  onClick={() => handlePurchaseConfirm(sweet.id)}
                                  size="sm"
                                  disabled={purchasing}
                                  className="bg-[#4ECDC4] text-black border-[3px] border-black font-black"
                                >
                                  {purchasing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Check className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  onClick={() => handlePurchaseClick(sweet.id)}
                                  size="sm"
                                  disabled={isOutOfStock}
                                  className="bg-[#4ECDC4] text-black border-[3px] border-black font-black"
                                >
                                  <ShoppingCart className="mr-2 h-4 w-4" />
                                  BUY
                                </Button>
                                {userRole === "ADMIN" && (
                                  <>
                                    <Button
                                      onClick={() => openRestockDialog(sweet)}
                                      variant="ghost"
                                      size="sm"
                                      className="border-0 text-black hover:bg-[#4ECDC4] hover:text-black font-black"
                                    >
                                      <ArrowUp className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      onClick={() => openEditModal(sweet)}
                                      variant="ghost"
                                      size="sm"
                                      className="border-0 text-black hover:bg-[#FFE66D] hover:text-black font-black"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      onClick={() => openDeleteDialog(sweet)}
                                      variant="ghost"
                                      size="sm"
                                      className="border-0 text-black hover:bg-[#FF6B6B] hover:text-white font-black"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="border-[3px] border-black bg-white neobrutalism-shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-black">{editingSweet ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}</DialogTitle>
            <DialogDescription className="text-base font-bold text-black">
              {editingSweet ? "UPDATE THE PRODUCT DETAILS BELOW." : "FILL IN THE DETAILS TO ADD A NEW PRODUCT."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={editingSweet ? handleUpdate : handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required={!editingSweet} placeholder="Enter product name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required={!editingSweet} placeholder="Enter category" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (INR)</Label>
              <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required={!editingSweet} placeholder="Enter price" min="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} required={!editingSweet} placeholder="Enter quantity" min="0" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => { setShowModal(false); setEditingSweet(null); setFormData({ name: "", category: "", price: "", quantity: "" }); }} className="bg-white text-black border-[3px] border-black font-black">CANCEL</Button>
              <Button type="submit" className="bg-[#FF6B6B] text-white border-[3px] border-black font-black">{editingSweet ? "UPDATE" : "CREATE"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="border-[3px] border-black bg-white neobrutalism-shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-black">DELETE PRODUCT</DialogTitle>
            <DialogDescription className="text-base font-bold text-black">ARE YOU SURE YOU WANT TO DELETE "{sweetToDelete?.name.toUpperCase()}"? THIS ACTION CANNOT BE UNDONE.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => { setDeleteDialogOpen(false); setSweetToDelete(null); }} disabled={deleting} className="bg-white text-black border-[3px] border-black font-black">CANCEL</Button>
            <Button type="button" variant="destructive" onClick={handleDelete} disabled={deleting} className="bg-[#FF6B6B] text-white border-[3px] border-black font-black">
              {deleting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> DELETING...</> : <><Trash2 className="mr-2 h-4 w-4" /> DELETE</>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={restockDialogOpen} onOpenChange={setRestockDialogOpen}>
        <DialogContent className="border-[3px] border-black bg-white neobrutalism-shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-black">RESTOCK PRODUCT</DialogTitle>
            <DialogDescription className="text-base font-bold text-black">ENTER THE QUANTITY TO ADD TO "{sweetToRestock?.name.toUpperCase()}". CURRENT QUANTITY: {sweetToRestock?.quantity}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRestock} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restockQuantity">Quantity to Add</Label>
              <Input id="restockQuantity" type="number" value={restockQuantity} onChange={(e) => setRestockQuantity(e.target.value)} required placeholder="Enter quantity" min="1" disabled={restocking} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => { setRestockDialogOpen(false); setSweetToRestock(null); setRestockQuantity(""); }} disabled={restocking} className="bg-white text-black border-[3px] border-black font-black">CANCEL</Button>
              <Button type="submit" disabled={restocking} className="bg-[#4ECDC4] text-black border-[3px] border-black font-black">
                {restocking ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> RESTOCKING...</> : <><ArrowUp className="mr-2 h-4 w-4" /> RESTOCK</>}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
