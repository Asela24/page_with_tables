import { Provider } from "react-redux";
import store from "../store/store";
import { RouterProvider } from "react-router";
import { routers } from "./routers";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routers} />
    </Provider>
  );
}

export default App;
