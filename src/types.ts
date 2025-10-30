export interface Tool {
    name: string;
    onClick: () => void;
    isActive: boolean;
    disabled: boolean;
}

export interface Subtopic {
    title: string;
    content: string;
}

export interface ListSubtopic {
	id: number;
	title: string;
	parentId: number | null;
}