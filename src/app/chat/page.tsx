import AppSidebar from "@/components/app-sidebar";
import ChatBox from "@/components/chat/chat-box";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Navbar from "@/components/navbar";

const Page = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">
      <AppSidebar />
      <div className="flex h-full flex-1 flex-col items-start justify-start">
        <Navbar />
        <div className="flex h-[calc(100vh-64px)] w-full p-5">
          <div className="h-full w-full flex-col items-start justify-start">
            <MaxWidthWrapper>
              <ChatBox />
            </MaxWidthWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
