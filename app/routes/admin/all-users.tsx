import { Header } from "components";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-grids";
//import { users } from "~/constants";
import { cn, formatDate } from "~/lib/utils";
import { getAllUsers } from "~/appwrite/auth";
import type { Route } from "./+types/all-users";


export const loader = async () => {
 const { users, total } = await getAllUsers(10, 0);
  console.log("====================================");
  console.log(users);
  console.log("====================================");
  return { users, total };
};
const AllUsers = ({ loaderData }: Route.ComponentProps) => {
  const { users } = loaderData;
  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter,sort,and access detailed user profiles"
      />
      <GridComponent dataSource={users} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
            template={(props: UserData) => (
              <div className="flex items-center gap-1.5 ">
                <img
                  src={props.imageUrl}
                  alt="user"
                  className="size-8 rounded-full aspect-square"
                  referrerPolicy="no-referrer"
                />
                <span className="text-base font-medium text-dark-100">
                  {props.name}
                </span>
              </div>
            )}
          />
          <ColumnDirective
            field="email"
            headerText="Email Address"
            width="200"
            textAlign="Left"
            template={(props: UserData) => (
              <div className="flex items-center gap-1.5 ">
                <img
                  src={props.imageUrl}
                  alt="user"
                  className="size-8 rounded-full aspect-square"
                  referrerPolicy="no-referrer"
                />
                <span className="text-base font-medium text-dark-100">
                  {props.email}
                </span>
              </div>
            )}
          />
          <ColumnDirective
            field="joinedAt"
            headerText="Date Joined"
            width="140"
            textAlign="Left"
            template={({joinedAt}:{joinedAt: string})=>(
              <div className="flex items-center gap-1.5">
                <span className="text-base font-medium text-dark-100">
                  {formatDate(joinedAt)}
                </span>
              </div>
            )}
          />
          
          <ColumnDirective
            field="status"
            headerText="Type"
            width="100"
            textAlign="Left"
            template={({ status }: UserData) => (
              <article
                className={cn(
                  "status-column",
                  status === "user" ? "bg-success-50" : "bg-light-300"
                )}
              >
                <div
                  className={cn(
                    "size-1.5 rounded-full",
                    status === "user" ? "bg-success-500" : "bg-gray-500"
                  )}
                />
                <h3
                  className={cn(
                    "font-inter text-xs font-medium",
                    status === "user" ? "text-success-700" : "text-gray-500"
                  )}
                >
                  {status === "user" ? "User" : "Admin"}
                </h3>
              </article>
            )}
          />
        </ColumnsDirective>
      </GridComponent>
    </main>
  );
};

export default AllUsers;
