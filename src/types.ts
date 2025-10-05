export interface Tool {
    name: string;
    onClick: () => void;
    isActive: boolean;
    disabled: boolean;
}