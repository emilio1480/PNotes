export interface Tool {
    name: string;
    onClick: () => void;
    isActive: boolean;
    disabled: boolean;
}

export interface Subheading {
    id: number;
    title: string;
    content: string;
    parent: ParentSubtopic;
	subheadings: Subheading[];
}

export interface ListSubheading {
	id: number;
	title: string;
	parent: number;
}

export interface ParentSubtopic {
    id: number;
    title: string;
}