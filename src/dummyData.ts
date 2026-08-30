import { ListSubtopic, Subtopic } from "@/types";


export const dummyListSubtopics: ListSubtopic[] = [
	{ id: 1, title: "Frontend Development", parentId: null },
	{ id: 2, title: "React", parentId: 1 },
	{ id: 3, title: "State Management", parentId: 2 },
	{ id: 4, title: "Zustand", parentId: 3 },
	{ id: 5, title: "Backend Development", parentId: null },
	{ id: 6, title: "Node.js", parentId: 5 },
	{ id: 7, title: "Database Systems", parentId: 5 },
	{ id: 8, title: "PostgreSQL", parentId: 7 },
];

export const dummySubtopics: Record<string, Subtopic> = {
	"1": {
		title: "Frontend Development",
		content: JSON.stringify({
			type: "doc",
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Overview of modern web user interface technologies.",
						},
					],
				},
			],
		}),
	},
	"2": {
		title: "React",
		content: JSON.stringify({
			type: "doc",
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "A JavaScript library for building component-based user interfaces.",
						},
					],
				},
			],
		}),
	},
	"3": {
		title: "State Management",
		content: JSON.stringify({
			type: "doc",
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Patterns and libraries for managing global application state.",
						},
					],
				},
			],
		}),
	},
	"4": {
		title: "Zustand",
		content: JSON.stringify({
			type: "doc",
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "A small, fast, and scalable bear-necessities state management solution.",
						},
					],
				},
			],
		}),
	},
	"5": {
		title: "Backend Development",
		content: JSON.stringify({
			type: "doc",
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Server-side logic, API design, and infrastructure management.",
						},
					],
				},
			],
		}),
	},
	"6": {
		title: "Node.js",
		content: JSON.stringify({
			type: "doc",
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "JavaScript runtime built on Chrome's V8 JavaScript engine.",
						},
					],
				},
			],
		}),
	},
	"7": {
		title: "Database Systems",
		content: JSON.stringify({
			type: "doc",
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "Structured systems for storing, retrieving, and managing data.",
						},
					],
				},
			],
		}),
	},
	"8": {
		title: "PostgreSQL",
		content: JSON.stringify({
			type: "doc",
			content: [
				{
					type: "paragraph",
					content: [
						{
							type: "text",
							text: "A powerful, open-source object-relational database system.",
						},
					],
				},
			],
		}),
	},
};
