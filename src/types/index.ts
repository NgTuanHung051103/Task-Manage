export type AccordionItemsTypes = {
    id?: string;
    title: string;
    description: string;
    dueDate: number;
    priority: string;
    completed?: boolean;
};

export type User = {
    userName: string;
    password: string;
}