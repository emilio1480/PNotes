export interface Tool {
    name: string;
    onClick: () => void;
    isActive: boolean;
    disabled: boolean;
}

export interface Subheading {
    title: string;
    content: string;
}

export interface ListSubheading {
	id: number;
	title: string;
	parentId: number;
}