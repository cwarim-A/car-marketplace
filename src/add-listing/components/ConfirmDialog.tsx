import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
    title?: string;
    description?: string;
    onConfirm: () => void;
    triggerText: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive" | "outline"; // Allows button styling
}

const ConfirmDialog = ({
    title = "Are you sure?",
    description = "This action cannot be undone.",
    onConfirm,
    triggerText,
    confirmText = "Yes, Confirm",
    cancelText = "Cancel",
    variant = "destructive",
}: ConfirmDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={variant}>{triggerText}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmDialog;
