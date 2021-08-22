import Layout from "@/components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardPage() {

    toast.success('Welcome to the dashboard')
    
    return (
      <div>
        <Layout title="User Dashboard">
          <ToastContainer position="top-center" />
          <h1>Dashboard</h1>
        </Layout>
      </div>
    );
}
