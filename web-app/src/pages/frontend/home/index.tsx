import { FrontendLayout } from "@/layouts";

const HomePage = () => {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
};
HomePage.getLayout = FrontendLayout;

export { HomePage };
