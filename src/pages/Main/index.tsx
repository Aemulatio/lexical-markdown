import { Flex } from "antd";
import { StoreProvider } from "../../contexts/StoreContext";
import { Editor, MardDownRender } from "../../widgets";

export const Main = () => {
  return (
    <StoreProvider>
      <Flex gap="20px" justify={"space-between"}>
        <Editor />
        <MardDownRender />
      </Flex>
    </StoreProvider>
  );
};
