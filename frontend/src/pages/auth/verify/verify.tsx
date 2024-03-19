import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {verifyEmail} from "@/lib/auth.ts";
import {toast} from "sonner";

const Verify = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        const verify = async () => {
            const status = await verifyEmail(id);
            if (status === 200) {
                toast.success("Email verified successfully");
                navigate("/auth/login");
            } else {
                toast.error("Something went wrong!");
            }
        }
        verify();
    }, [id]);
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold">Email verification</CardTitle>
                    <CardDescription>
                        Verifying your email. Please wait...
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
};

export default Verify;
