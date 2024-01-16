const TaskCardSkeleton = () => {
   return (
      <div className={`w-full h-32 flex justify-between rounded-md bg-gray-800 animate-pulse`}>
         <div className="flex justify-center items-center w-10 sm:w-16 rounded-l-md bg-[#253040]" />

         <div className="w-full flex justify-between px-5 py-4">
            <div className="basis-full flex flex-col justify-between">
               <div className="h-5 w-2/5 bg-[#253040] rounded-md" />
               <div className="h-5 bg-[#253040] rounded-md" />
               <div className="h-5 flex justify-between items-center">
                  <div className="h-3 w-1/6 rounded-md bg-[#253040]" />
                  <div className="h-3 w-1/3 rounded-md bg-[#253040]" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default TaskCardSkeleton;
