"use client"
import Image from "next/image";
import Logo from "../../../public/Frame 6.svg";
import NoProfilePic from "../../../public/nfp.svg";
import { MessagesList } from "../../app/_components/messagesList";
import { SearchBar } from "../../app/_components/searchBar";

export function SideBar() {
  return (
    <div className="p-3 max-h-screen w-full md:w-2/5 overflow-auto no-scrollbar">
      <div className="flex items-start justify-between gap-12 h-14 w-full border-green-900">
        <div className="flex items-start justify-start gap-2 p-2 flex-row">
           <Image src={Logo} alt="Nothing" width={40} height={40}/>
           <label className="text-green-950 text-center my-auto">CHATBOOTH</label>
        </div>

        <div className="flex flex-row p-2 gap-2 text-white">
          <label className="text-xs rotate-90">Profile</label>
          <Image src={NoProfilePic} alt="nfp" width={40} height={40} priority />
        </div>
      </div>

       <SearchBar/>
      <MessagesList/>
    </div>
  );
}
