import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

export const ErrorMessage = ({ children }: Props) => {
  return (
    <div className="text-center my-4bg bg-red-100 font-bold p-3 uppercase text-sm">
      {children}
    </div>
  );
};
