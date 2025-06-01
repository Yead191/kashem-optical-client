import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { IoMdClose } from "react-icons/io";
import useCategory from "../../hooks/useCategory";
import toast from "react-hot-toast";
import { uploadToImgbb } from "../UploadImage";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AddProductModal = ({ isOpen, onClose, refetch }) => {
  const [categories, categoriesLoading] = useCategory();
  const [imageLoading, setImageLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Form state
  const [brandName, setBrandName] = useState("");
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [modelNo, setModelNo] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [origin, setOrigin] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [warranty, setWarranty] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState("");
  const [quantity, setQuantity] = useState("");
  const [glassType, setGlassType] = useState("");

  // Lens Section
  const [frameType, setFrameType] = useState("");
  const [frameShape, setFrameShape] = useState("");
  const [frameMaterial, setFrameMaterial] = useState("");
  const [templeMaterial, setTempleMaterial] = useState("");
  const [frameSize, setFrameSize] = useState("");
  const [frameWidth, setFrameWidth] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [weightGroup, setWeightGroup] = useState("");
  const [frameStyle, setFrameStyle] = useState("");
  const [frameStyleSecondary, setFrameStyleSecondary] = useState("");
  const [prescription, setPrescription] = useState("");
  const [lensMaterial, setLensMaterial] = useState("");
  // Spectacle Prescription Values
  const [odSph, setOdSph] = useState("");
  const [odCyl, setOdCyl] = useState("");
  const [odAxis, setOdAxis] = useState("");
  const [odAdd, setOdAdd] = useState("");
  const [osSph, setOsSph] = useState("");
  const [osCyl, setOsCyl] = useState("");
  const [osAxis, setOsAxis] = useState("");
  const [osAdd, setOsAdd] = useState("");
  // Watch Section
  const [caseMetal, setCaseMetal] = useState("");
  const [caseSize, setCaseSize] = useState("");
  const [braceletMaterial, setBraceletMaterial] = useState("");
  const [wr, setWr] = useState("");

  // Calculate discount percentage
  const discountPercentage =
    price && discountedAmount ? ((price - discountedAmount) / price) * 100 : 0;
  const roundedDiscountPercentage = parseInt(discountPercentage.toFixed(2));

  // Image Upload Functionality
  const handleUploadImage = () => {
    document.getElementById("image_input").click();
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setBrandName("");
    setProductName("");
    setProductType("");
    setModelNo("");
    setCategory("");
    setGender("");
    setOrigin("");
    setManufacturer("");
    setWarranty("");
    setColor("");
    setPrice(0);
    setDiscountedAmount(0);
    setDescription("");
    setCollection("");
    setFrameType("");
    setFrameShape("");
    setFrameMaterial("");
    setTempleMaterial("");
    setFrameSize("");
    setFrameWidth("");
    setDimensions("");
    setWeight("");
    setWeightGroup("");
    setFrameStyle("");
    setFrameStyleSecondary("");
    setPrescription("");
    setLensMaterial("");
    setOdSph("");
    setOdCyl("");
    setOdAxis("");
    setOdAdd("");
    setOsSph("");
    setOsCyl("");
    setOsAxis("");
    setOsAdd("");
    setCaseMetal("");
    setCaseSize("");
    setBraceletMaterial("");
    setGlassType("");
    setWr("");
    setImages([]);
    setPreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);

    // Form Validations
    const validations = [
      [images.length === 0, "Upload at least one Product Image to Proceed!"],
      [!brandName, "Brand Name is Required!"],
      [!productName, "Product Name is Required!"],
      [!category, "Select a Category for the Product!"],
      [!gender, "Select a Gender for the Product!"],
      [!origin, "Specify the Country of Origin!"],
      [!price, "Specify the Product Price!"],
      [
        discountedAmount > price,
        "Discounted Price cannot be greater than Original Price!",
      ],
    ];

    for (const [condition, errorMessage] of validations) {
      if (condition) {
        setImageLoading(false);
        toast.error(errorMessage);
        return;
      }
    }

    // Upload all images to ImgBB
    let imageUrls = [];
    try {
      const uploadPromises = images.map((file) =>
        uploadToImgbb({ target: { files: [file] } })
      );
      const uploadResults = await toast.promise(Promise.all(uploadPromises), {
        loading: "Uploading Images...",
        success: <b>Images uploaded successfully!</b>,
        error: <b>Could not upload images.</b>,
      });
      imageUrls = uploadResults.map((result) => result.url);
    } catch (error) {
      setImageLoading(false);
      toast.error("Failed to upload images. Please try again.");
      return;
    }

    const newProduct = {
      productName,
      brandName,
      modelNo,
      category,
      gender,
      origin,
      warranty,
      color,
      quantity: parseInt(quantity),
      price: {
        amount: parseInt(price),
        currency: "BDT",
        discount: {
          percentage: parseInt(roundedDiscountPercentage),
          discountedAmount: parseInt(discountedAmount) || 0,
        },
      },
      description,
      collection,
      image: imageUrls,
      status: "In Stock",
      // Lens Section
      frameType,
      frameShape,
      frameMaterial,
      templeMaterial,
      frameSize,
      frameWidth,
      dimensions,
      weight,
      weightGroup,
      frameStyle,
      frameStyleSecondary,
      prescription,
      lensMaterial,
      spectaclePrescription: {
        OD: { sph: odSph, cyl: odCyl, axis: odAxis, add: odAdd },
        OS: { sph: osSph, cyl: osCyl, axis: osAxis, add: osAdd },
      },
      // Watch Section
      caseMetal,
      caseSize,
      braceletMaterial,
      glassType,
      wr,
    };

    try {
      await toast.promise(axiosSecure.post("/products", newProduct), {
        loading: "Adding Product...",
        success: <b>Product Added Successfully!</b>,
        error: <b>Could not add.</b>,
      });
      refetch();
      resetForm();
      onClose();
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Add New Product</span>
            {/* <button onClick={onClose} className="text-gray-500 text-2xl">
              <IoMdClose />
            </button> */}
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Brand Name & Product Type */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input
                required
                placeholder="Enter Product Name (e.g., Gunmetal Full Rim Square)"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Brand Name</Label>
              <Input
                required
                placeholder="Enter Brand Name (e.g., John Jacobs)"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>
          </div>

          {/* Model No. & Category */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Model No.</Label>
              <Input
                placeholder="Enter Model No. (e.g., JJ E11540)"
                value={modelNo}
                onChange={(e) => setModelNo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat._id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Gender & Origin */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Kids">Kids</SelectItem>
                  <SelectItem value="Unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Country of Origin</Label>
              <Input
                required
                placeholder="Country of Origin (e.g., Japan)"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
          </div>

          {/* Color & Warranty */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Color</Label>
              <Input
                placeholder="ex. Gunmetal"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Warranty</Label>
              <Input
                placeholder="ex. 1 Year Manufacturer Warranty"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
              />
            </div>
          </div>

          {/* lass Type & Stock */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Glass Type</Label>
              <Input
                placeholder="ex. Sapphire"
                value={glassType}
                onChange={(e) => setGlassType(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Quantity Available</Label>
              <Input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="ex. 10"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>

          {/* Price, Discounted Price & Percentage */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label>Original Price</Label>
              <Input
                required
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Original Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Discounted Price</Label>
              <Input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Discounted Price"
                value={discountedAmount}
                onChange={(e) => setDiscountedAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Discount Percentage</Label>
              <Input readOnly value={roundedDiscountPercentage || 0} />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div className="w-full">
            <input
              type="file"
              name="image"
              id="image_input"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            {previews.length === 0 ? (
              <div
                className="w-full flex items-center justify-center flex-col gap-4 border-gray-300 border rounded-md py-4 cursor-pointer"
                onClick={handleUploadImage}
              >
                <FaFileUpload className="text-[2rem] text-[#777777]" />
                <p className="text-gray-700">Browse to Upload Product Images</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {previews?.map((preview, index) => (
                  <div
                    key={index}
                    className="relative w-full border border-gray-200 rounded-xl p-4"
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="mx-auto object-cover rounded w-full h-32"
                    />
                    <MdDelete
                      className="text-[1.5rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer rounded-tr-[13px]"
                      onClick={() => handleRemoveImage(index)}
                    />
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium text-gray-700">
                        {images[index].name.length > 50
                          ? `${images[index].name.slice(0, 50)}...`
                          : images[index].name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(images[index].size / 1024).toFixed(2)} KB |{" "}
                        {images[index].type}
                      </p>
                    </div>
                  </div>
                ))}
                <div
                  className="w-full flex items-center justify-center flex-col gap-2 border-gray-300 border rounded-md py-4 cursor-pointer"
                  onClick={handleUploadImage}
                >
                  <FaFileUpload className="text-[1.5rem] text-[#777777]" />
                  <p className="text-gray-700 text-sm">Add More Images</p>
                </div>
              </div>
            )}
          </div>

          {/* Lens Section Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-gray-500 text-sm">LENS SECTION</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Lens Section Inputs */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Frame Type</Label>
              <Input
                placeholder="ex. Full Rim"
                value={frameType}
                onChange={(e) => setFrameType(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Frame Shape</Label>
              <Input
                placeholder="ex. Square"
                value={frameShape}
                onChange={(e) => setFrameShape(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Frame Material</Label>
              <Input
                placeholder="ex. TR90"
                value={frameMaterial}
                onChange={(e) => setFrameMaterial(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Temple Material</Label>
              <Input
                placeholder="ex. TR90"
                value={templeMaterial}
                onChange={(e) => setTempleMaterial(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Frame Size</Label>
              <Input
                placeholder="ex. Medium"
                value={frameSize}
                onChange={(e) => setFrameSize(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Frame Width</Label>
              <Input
                placeholder="ex. 135 mm"
                value={frameWidth}
                onChange={(e) => setFrameWidth(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Frame Dimensions</Label>
              <Input
                placeholder="ex. 51-17-135"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Weight</Label>
              <Input
                placeholder="ex. 15 gm"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Weight Group</Label>
              <Input
                placeholder="ex. Light"
                value={weightGroup}
                onChange={(e) => setWeightGroup(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Frame Style</Label>
              <Input
                placeholder="ex. Standard"
                value={frameStyle}
                onChange={(e) => setFrameStyle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Frame Style Secondary</Label>
              <Input
                placeholder="ex. Light-Weight"
                value={frameStyleSecondary}
                onChange={(e) => setFrameStyleSecondary(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Prescription Type</Label>
              <Input
                placeholder="ex. Zero Power"
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
              />
            </div>
          </div>

          {/* Spectacle Prescription Inputs */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500 text-sm">
                SPECTACLE PRESCRIPTION
              </span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            {/* OD (Right Eye) */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
              <div className="space-y-2">
                <Label>OD SPH</Label>
                <Input
                  placeholder="ex. -4.25"
                  value={odSph}
                  onChange={(e) => setOdSph(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>OD CYL</Label>
                <Input
                  placeholder="ex. -2.55"
                  value={odCyl}
                  onChange={(e) => setOdCyl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>OD Axis</Label>
                <Input
                  placeholder="ex. 182"
                  value={odAxis}
                  onChange={(e) => setOdAxis(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>OD ADD</Label>
                <Input
                  placeholder="ex. 161"
                  value={odAdd}
                  onChange={(e) => setOdAdd(e.target.value)}
                />
              </div>
            </div>
            {/* OS (Left Eye) */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
              <div className="space-y-2">
                <Label>OS SPH</Label>
                <Input
                  placeholder="ex. 2.64"
                  value={osSph}
                  onChange={(e) => setOsSph(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>OS CYL</Label>
                <Input
                  placeholder="ex. -2.10"
                  value={osCyl}
                  onChange={(e) => setOsCyl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>OS Axis</Label>
                <Input
                  placeholder="ex. 180"
                  value={osAxis}
                  onChange={(e) => setOsAxis(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>OS ADD</Label>
                <Input
                  placeholder="ex. 165"
                  value={osAdd}
                  onChange={(e) => setOsAdd(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Watch Section Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-gray-500 text-sm">WATCH SECTION</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Watch Section Inputs */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Case Metal</Label>
              <Input
                placeholder="ex. Stainless Steel"
                value={caseMetal}
                onChange={(e) => setCaseMetal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Case Size (mm)</Label>
              <Input
                placeholder="ex. 41.5 mm"
                value={caseSize}
                onChange={(e) => setCaseSize(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Bracelet Material</Label>
              <Input
                placeholder="ex. Leather"
                value={braceletMaterial}
                onChange={(e) => setBraceletMaterial(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>WR (Water Resistance)</Label>
              <Input
                placeholder="ex. 5 ATM"
                value={wr}
                onChange={(e) => setWr(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <DialogFooter>
            <Button
              disabled={imageLoading}
              className="w-full cursor-pointer"
              type="submit"
            >
              {imageLoading ? "Please Wait..." : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
