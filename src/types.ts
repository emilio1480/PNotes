export interface Tool {
    name: string;
    onClick: () => void;
    isActive: boolean;
    disabled: boolean;
}

export interface Subtopic {
    id: number;
    title: string;
    content: string;
    parent: ParentSubtopic;
}

export interface ParentSubtopic {
    id: number;
    title: string;
}