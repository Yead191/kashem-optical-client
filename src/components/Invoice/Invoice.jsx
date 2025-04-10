import { Button } from "@/components/ui/button";
import {
  Document,
  Page,
  PDFDownloadLink,
  PDFViewer,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";

import { useParams } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { styles } from "./invoiceStyle";
import { useQuery } from "react-query";
import useAuth from "@/hooks/useAuth";

// Register a custom font (optional, adjust as needed)
Font.register({
  family: "NotoSansBengali",
  src: "/fonts/NotoSansBengali-Regular.ttf",
});

const InvoicePDF = ({ invoice = {}, user = {} }) => (
  <Document pageLayout="singlePage">
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.spaceY}>
          <Text style={[styles.title, styles.textBold]}>INVOICE</Text>
          <Text>
            Invoice - {""}
            {invoice?._id?.substring(invoice._id).toUpperCase() ||
              "N/A"}
            {/* Fixed substring syntax */}
          </Text>
        </View>
        <View style={[styles.spaceY, styles.textRight]}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Kashem <Text style={{ color: "#2563EB" }}>Optical</Text>
            </Text>
          </View>
          <Text>Chakbazar</Text>
          <Text>Lakshmipur, Chittagong</Text>
          <Text>Bangladesh</Text>
        </View>
      </View>

      {/* Bill To Section */}
      <View style={styles.spaceY}>
        <Text style={[styles.textBold, styles.billTo]}>Bill To</Text>
        <Text>{invoice?.customerInfo?.name || user?.displayName || "N/A"}</Text>
        <Text>{invoice?.customerInfo?.phone || "N/A"}</Text>
        <Text>{invoice?.customerInfo?.address || "N/A"}</Text>
        <Text>
          {invoice?.customerInfo?.district || "N/A"},{" "}
          {invoice?.customerInfo?.division || "N/A"}, Bangladesh
        </Text>
        <Text style={{ color: "green" }}>Payment Status: {invoice?.paymentStatus}</Text>
      </View>

      {/* Table of Ordered Products */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableHeader, { flexDirection: "row" }]}>
          <Text style={[styles.td, { flex: 3 }]}>Product Description</Text>
          <Text style={[styles.td, { flex: 1, textAlign: "center" }]}>
            Quantity
          </Text>
          <Text style={[styles.td, { flex: 1, textAlign: "center" }]}>
            Unit Price
          </Text>
          <Text style={[styles.td, { flex: 1, textAlign: "center" }]}>
            Subtotal
          </Text>
        </View>
        {/* Table Rows */}
        {invoice?.products?.length > 0 ? (
          invoice.products.map((product, i) => (
            <View key={i} style={{ flexDirection: "row" }}>
              <Text style={[styles.td, { flex: 3 }]}>
                {product.productName} ({product.brandName})
              </Text>
              <Text style={[styles.td, { flex: 1, textAlign: "center" }]}>
                {product.quantity}
              </Text>
              <Text style={[styles.td, { flex: 1, textAlign: "center" }]}>
                Tk {product.price.toFixed(2)}
              </Text>
              <Text style={[styles.td, { flex: 1, textAlign: "center" }]}>
                Tk {product.subtotal.toFixed(2)}
              </Text>
            </View>
          ))
        ) : (
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.td, { flex: 1 }]}>No products found</Text>
          </View>
        )}
      </View>

      {/* Total Section */}
      <View style={{ display: "flex", alignItems: "flex-end" }}>
        <View style={{ minWidth: "200px" }}>
          {invoice?.discountAmount && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "8px",
                color: "green",
              }}
            >
              <Text>Discount ({invoice?.discountPercentage}%)</Text>
              <Text>- Tk {invoice?.discountAmount}</Text>
            </View>
          )}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Text style={styles.textBold}>Grand Total</Text>
            <Text style={styles.textBold}>
              Tk {invoice?.totalPrice.toFixed(2) || "0.00"}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={{ marginTop: 20, textAlign: "center" }}>
        <Text style={{ fontSize: 10 }}>
          Thank you for shopping with Kashem Optical! For inquiries, contact us
          at support@kashemoptical.com
        </Text>
      </View>
    </Page>
  </Document>
);

const Invoice = () => {
  const { invoiceId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: invoice = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/invoice/${invoiceId}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <p>Loading invoice...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <p>Error loading invoice: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center place-content-center place-items-center  w-full h-[85vh] max-w-3xl mx-auto">
      <PDFViewer width="100%" height="100%">
        <InvoicePDF user={user} invoice={invoice} />
      </PDFViewer>
      <div className="mt-8">
        <PDFDownloadLink
          document={<InvoicePDF user={user} invoice={invoice} />}
          fileName={`invoice-${invoiceId}.pdf`}
        >
          <Button>Download PDF</Button>
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Invoice;
