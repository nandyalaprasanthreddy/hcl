
interface PageLayoutProps {
    children:React.ReactNode
    title:string
    }
    const PageLayout: React.FC<PageLayoutProps>= ({title,children}) => {
      return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
          {children} 
      </div>
      </div>
      
      )
    }
    
    export default PageLayout