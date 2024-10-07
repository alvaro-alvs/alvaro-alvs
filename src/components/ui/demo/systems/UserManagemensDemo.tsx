import { DemoUsersList } from "./DemoUsersList";
import { DemoUsersSearch } from "./DemoUsersSearch";
import UserManagementProvider from "./ManagemendDemoProvider";






export default function UserManagementDemo() {

    return (
        <UserManagementProvider>
            <DemoUsersSearch />
            
            <div className="h-full overflow-y-scroll">
                <DemoUsersList />
            </div>
        </UserManagementProvider>
    )
}