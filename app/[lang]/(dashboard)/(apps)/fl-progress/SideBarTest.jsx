import { cn } from "@/lib/utils";
import { getContacts } from "../chat/chat-config";
import ContactList from "../task/components/contact-list";

const priorityFilters = [
  {
    label: "High",
    value: "high",
    color: "destructive",
    total: "03",
  },
  {
    label: "Medium",
    value: "medium",
    color: "warning",
    total: "04",
  },
  {
    label: "Low",
    value: "low",
    color: "info",
    total: "03",
  },
];

const SideBarTest = async () => {
	const contacts = await getContacts();
    return (
			<div className='pl-5'>
				<div className="mt-3 md:px-4 px-2">
				<div className="text-xs font-medium text-default-800 uppercase">
					Priority
				</div>
				<ul className="mt-3">
					{priorityFilters.map((item, index) => (
						<li
						key={`priority-item-${index}`}
						className="flex justify-between gap-2 space-y-4 cursor-pointer"
						>
							<div className="flex items-center gap-2">
								<span
									className={cn(
										`w-2 h-2 rounded-full block bg-${item.color} ring-${item.color}`,
										{}
									)}
									></span>
								<span className="text-sm font-medium text-default-600">
									{item.label}
								</span>
							</div>
							<span className="text-sm font-medium text-default-600">
								{item.total}
							</span>
						</li>
					))}
				</ul>
				</div>
				<div className="border border-dashed mt-5 border-default-300"></div>
				<div className="text-xs font-medium text-default-800 uppercase my-3 px-4">
					{" "}
					Chats
				</div>
				{contacts?.contacts?.slice(0,4).map((contact) => (
					<ContactList key={contact.id} contact={contact} />
				))}
			</div>
    )
}
export default SideBarTest;