export interface ButtonProps {
    color: "primary" | "secondary";
    onClick: VoidFunction;
    title: string;
    isDisabled?: boolean | undefined;
}