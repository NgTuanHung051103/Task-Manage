export type AccordionItemsTypes = {
    id?: string;
    title: string;
    description: string;
    dueDate: number;
    priority: string;
    completed?: boolean;
};

export type User = {
    id?: string;
    userName: string;
    password: string;
}

export type Message = {
    id: String;
    taskId: string;
    userId: string;
    content: string;
    date: number;
}