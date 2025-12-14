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

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  // Purchase state - track which sweets are in purchase mode and their quantities
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
        // If quantity reaches 0, exit purchase mode
        if (newQuantity === 0) {
          setPurchaseMode((prevMode) => {
            const newMode = { ...prevMode };
            delete newMode[sweetId];
            return newMode;
          });
          // Remove the purchase quantity
          const newQuantities = { ...prev };
          delete newQuantities[sweetId];
          return newQuantities;
        }
        // Decrease quantity normally
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
        // Exit purchase mode
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
        // Refresh sweets list
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

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Shop Manager</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-muted-foreground">
                  Welcome, {session?.user?.name || "User"}
                </p>
                {userRole && (
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    userRole === "ADMIN" 
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}>
                    {userRole}
                  </span>
                )}
              </div>
            </div>
            <Button
              onClick={() => signOut()}
              variant="destructive"
              size="default"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Sweets
            </CardTitle>
            <CardDescription>
              Filter sweets by name, category, or maximum price
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                type="text"
                placeholder="Name"
                value={searchFilters.name}
                onChange={(e) =>
                  setSearchFilters({ ...searchFilters, name: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Category"
                value={searchFilters.category}
                onChange={(e) =>
                  setSearchFilters({ ...searchFilters, category: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Max Price"
                value={searchFilters.maxPrice}
                onChange={(e) =>
                  setSearchFilters({ ...searchFilters, maxPrice: e.target.value })
                }
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSearch}
                  className="flex-1"
                  variant="default"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button
                  onClick={resetFilters}
                  variant="outline"
                >
                  <X className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Package className="h-6 w-6" />
              Sweets Inventory
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your sweets inventory
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingSweet(null);
              setFormData({ name: "", category: "", price: "", quantity: "" });
              setShowModal(true);
            }}
            size="lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Sweet
          </Button>
        </div>

        {/* Sweets Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                <p className="text-muted-foreground">Loading sweets...</p>
              </div>
            ) : sweets.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                <Package className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No sweets found</p>
                <Button
                  onClick={() => {
                    setEditingSweet(null);
                    setFormData({ name: "", category: "", price: "", quantity: "" });
                    setShowModal(true);
                  }}
                  variant="outline"
                  className="mt-2"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Sweet
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price (INR)</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Purchase</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sweets.map((sweet) => {
                      const isInPurchaseMode = purchaseMode[sweet.id];
                      const purchaseQty = purchaseQuantities[sweet.id] || 1;
                      const isOutOfStock = sweet.quantity === 0;

                      return (
                        <TableRow key={sweet.id}>
                          <TableCell className="font-medium">{sweet.name}</TableCell>
                          <TableCell>{sweet.category}</TableCell>
                          <TableCell>₹{sweet.price}</TableCell>
                          <TableCell>{sweet.quantity}</TableCell>
                          <TableCell className="text-right">
                            {isInPurchaseMode ? (
                              <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleDecreaseQuantity(sweet.id)}
                                    className="h-8 w-8"
                                    disabled={purchasing}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="min-w-[2rem] text-center font-medium">
                                    {purchaseQty}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleIncreaseQuantity(sweet.id, sweet.quantity)}
                                    disabled={purchaseQty >= sweet.quantity || purchasing}
                                    className="h-8 w-8"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Button
                                  onClick={() => handlePurchaseConfirm(sweet.id)}
                                  variant="default"
                                  size="sm"
                                  disabled={purchasing}
                                >
                                  {purchasing ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Processing...
                                    </>
                                  ) : (
                                    <>
                                      <Check className="mr-2 h-4 w-4" />
                                      Confirm Purchase
                                    </>
                                  )}
                                </Button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => handlePurchaseClick(sweet.id)}
                                variant="default"
                                size="sm"
                                disabled={isOutOfStock}
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Purchase
                              </Button>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                onClick={() => openRestockDialog(sweet)}
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <ArrowUp className="mr-2 h-4 w-4" />
                                Restock
                              </Button>
                              <Button
                                onClick={() => openEditModal(sweet)}
                                variant="ghost"
                                size="sm"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Button>
                              <Button
                                onClick={() => openDeleteDialog(sweet)}
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </Button>
                            </div>
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

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          onClose={() => {
            setShowModal(false);
            setEditingSweet(null);
            setFormData({ name: "", category: "", price: "", quantity: "" });
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {editingSweet ? "Edit Sweet" : "Add New Sweet"}
            </DialogTitle>
            <DialogDescription>
              {editingSweet
                ? "Update the sweet details below."
                : "Fill in the details to add a new sweet to your inventory."}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={editingSweet ? handleUpdate : handleCreate}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required={!editingSweet}
                placeholder="Enter sweet name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required={!editingSweet}
                placeholder="Enter category"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (INR)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required={!editingSweet}
                placeholder="Enter price"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required={!editingSweet}
                placeholder="Enter quantity"
                min="0"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowModal(false);
                  setEditingSweet(null);
                  setFormData({ name: "", category: "", price: "", quantity: "" });
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingSweet ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent
          onClose={() => {
            setDeleteDialogOpen(false);
            setSweetToDelete(null);
          }}
        >
          <DialogHeader>
            <DialogTitle>Delete Sweet</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{sweetToDelete?.name}"? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setSweetToDelete(null);
              }}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restock Dialog */}
      <Dialog open={restockDialogOpen} onOpenChange={setRestockDialogOpen}>
        <DialogContent
          onClose={() => {
            setRestockDialogOpen(false);
            setSweetToRestock(null);
            setRestockQuantity("");
          }}
        >
          <DialogHeader>
            <DialogTitle>Restock Sweet</DialogTitle>
            <DialogDescription>
              Enter the quantity to add to "{sweetToRestock?.name}". Current quantity: {sweetToRestock?.quantity}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRestock} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restockQuantity">Quantity to Add</Label>
              <Input
                id="restockQuantity"
                type="number"
                value={restockQuantity}
                onChange={(e) => setRestockQuantity(e.target.value)}
                required
                placeholder="Enter quantity"
                min="1"
                disabled={restocking}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setRestockDialogOpen(false);
                  setSweetToRestock(null);
                  setRestockQuantity("");
                }}
                disabled={restocking}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={restocking}
              >
                {restocking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Restocking...
                  </>
                ) : (
                  <>
                    <ArrowUp className="mr-2 h-4 w-4" />
                    Restock
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
