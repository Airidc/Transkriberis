import { ReactChild, ReactChildren } from 'react'

interface LayoutProps {
    children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div id="app">
            {children}
        </div>
    )
}
