"use client";

// NOTE: useSession (NextAuth) temporarily disabled to prevent CLIENT_FETCH_ERROR.
// Restore by re-importing useSession from "next-auth/react" and restoring auth guard at top of component.
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, UploadCloud, MapPin, DollarSign, Target, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PostPropertyPage() {
  // --- Auth stub: replace with useSession() when NextAuth is configured ---
  // const { data: session, status } = useSession();
  // if (status === "unauthenticated") { router.push("/api/auth/signin?..."); return null; }
  const session = null; // stub
  // -----------------------------------------------------------------------

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    propertyType: "Office",
    listingType: "For Sale",
    sqft: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    price: "",
    capRate: "",
    noi: "",
    description: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);

      const newUrls = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviewUrls((prev) => [...prev, ...newUrls]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // 1. Upload Images to Cloudinary sequentially
      const uploadedImageUrls: string[] = [];
      for (const file of images) {
        const fileData = new FormData();
        fileData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: fileData,
        });

        const uploadJson = await uploadRes.json();
        if (uploadJson.url) {
          uploadedImageUrls.push(uploadJson.url);
        } else {
          throw new Error("Failed to upload image");
        }
      }

      // 2. Submit Property Data to Next.js API
      const payload = {
        title: formData.title,
        description: formData.description,
        propertyType: formData.propertyType.toUpperCase(),
        listingType: formData.listingType === "For Sale" ? "SALE" : "LEASE",
        price: Number(formData.price) || 0,
        capRate: Number(formData.capRate) || 0,
        noi: Number(formData.noi) || 0,
        sqft: Number(formData.sqft) || 0,
        streetAddress: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        lat: 0,
        lng: 0,
        images: uploadedImageUrls,
        submitterId: null, // auth disabled — no user id available
      };

      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.status === "success") {
        router.push("/dashboard");
      } else {
        setError(json.error || "Failed to create property listing");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-73px)] py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">

        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            List Your Commercial Property
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Reach thousands of qualified investors, funds, and tenants. Join the modern commercial real estate network.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-10">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>

            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2 border-b border-border pb-2">
                <Building2 className="w-5 h-5 text-primary" /> Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Listing Title *</label>
                  <input required name="title" value={formData.title} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50" placeholder="e.g. Prime Downtown Office" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Property Type *</label>
                  <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-white">
                    <option value="OFFICE">Office</option>
                    <option value="RETAIL">Retail</option>
                    <option value="INDUSTRIAL">Industrial</option>
                    <option value="MULTIFAMILY">Multifamily</option>
                    <option value="LAND">Land</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Listing Type *</label>
                  <select name="listingType" value={formData.listingType} onChange={handleChange} className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 bg-white">
                    <option value="For Sale">For Sale</option>
                    <option value="For Lease">For Lease</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Gross Leasable Area (Sq Ft)</label>
                  <input required name="sqft" value={formData.sqft} onChange={handleChange} type="number" className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50" placeholder="0" />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2 border-b border-border pb-2">
                <MapPin className="w-5 h-5 text-primary" /> Location
              </h2>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Street Address *</label>
                <input required name="streetAddress" value={formData.streetAddress} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50" placeholder="123 Business Rd" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">City *</label>
                  <input required name="city" value={formData.city} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50" placeholder="City" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">State *</label>
                  <input required name="state" value={formData.state} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50" placeholder="State" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Zip Code *</label>
                  <input required name="zipCode" value={formData.zipCode} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50" placeholder="12345" />
                </div>
              </div>
            </div>

            {/* Financials */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2 border-b border-border pb-2">
                <DollarSign className="w-5 h-5 text-primary" /> Financials
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Asking Price *</label>
                  <input required name="price" value={formData.price} onChange={handleChange} type="number" className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50" placeholder="$0" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Cap Rate (%)</label>
                  <input name="capRate" value={formData.capRate} onChange={handleChange} type="number" step="0.1" className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50" placeholder="0.0" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Net Operating Income (NOI)</label>
                  <input name="noi" value={formData.noi} onChange={handleChange} type="number" className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50" placeholder="$0" />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2 border-b border-border pb-2">
                <UploadCloud className="w-5 h-5 text-primary" /> Media &amp; Documents
              </h2>

              <label className="block border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-center relative overflow-hidden">
                <UploadCloud className="w-10 h-10 text-slate-400 mb-3" />
                <p className="text-slate-700 font-medium mb-1">Click to upload images</p>
                <p className="text-slate-500 text-sm">PNG or JPG. Max 10MB per file.</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </label>

              {imagePreviewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group">
                      <img src={url} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2 border-b border-border pb-2">
                <Target className="w-5 h-5 text-primary" /> Overview
              </h2>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50" placeholder="Provide a detailed description of the property, highlights, and investment upside..."></textarea>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex justify-end gap-4">
              <Button disabled={isSubmitting} variant="outline" type="button" className="w-32">Save Draft</Button>
              <Button disabled={isSubmitting} type="submit" className="w-56 bg-accent hover:bg-emerald-600 text-white border-0">
                {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</> : "Submit for Approval"}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
