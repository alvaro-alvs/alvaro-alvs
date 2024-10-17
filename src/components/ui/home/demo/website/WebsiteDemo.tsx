import WebsiteDemoFooter from "./WebsiteDemoFooter"
import DemoSection2 from "./WebsiteDemoSection2"
import DemoSection1 from "./WebsiteDemoSection1"
import DemoNav from "./WebsiteDemoNav"
import WebsiteDemoImages from "./WebsiteDemoImages"
import WebsiteDemoForm from "./WebsiteDemoForm"

export const WebsiteDemo = () => {


    return (
        <div className="relative overflow-y-scroll h-full">
            <DemoNav />
            
            <DemoSection2 />

            <DemoSection1 />

            <WebsiteDemoImages />

            <WebsiteDemoForm />

            <WebsiteDemoFooter />
        </div>
    )
}