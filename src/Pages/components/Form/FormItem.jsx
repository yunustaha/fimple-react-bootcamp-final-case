const FormItem = ({ title, children }) => {
  return (
    <label className="flex w-full flex-1 flex-col">
      <div>
        <span className="text-nowrap text-xs sm:text-sm ">{title}</span>
        <span className="text-red-500">*</span>
      </div>
      {children}
    </label>
  );
};

export default FormItem;
