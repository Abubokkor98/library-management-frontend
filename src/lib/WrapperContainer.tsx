export const WrapperContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="max-w-[96%] md:mx-w-[90%] xl:max-w-[80%] mx-auto">
      {children}
    </div>
  );
};
