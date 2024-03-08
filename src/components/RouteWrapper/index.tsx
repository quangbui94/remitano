import { Route, RouteProps } from "react-router-dom";

interface IRouteWrapper extends RouteProps {
  component: React.ComponentType<any>;
  layout: React.ComponentType<any>;
}

const RouteWrapper: React.FC<IRouteWrapper> = ({
  component: Component,
  layout: Layout,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default RouteWrapper;
