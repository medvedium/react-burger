import React, { ErrorInfo, ReactElement } from "react";

class ErrorBoundary extends React.Component {
  constructor(props: ReactElement) {
    super(props);
    this.state = { hasError: false };
  }

  // с помощью этого метода меняем стейт компонента при возникновении ошибки:
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // с помощью этого метода логируем информацию об ошибке:
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("Возникла ошибка!", error, info);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      // если возникла ошибка, сообщаем об этом пользователю в специальном компоненте:
      return (
        <section className={"p-10"}>
          <h1>Что-то пошло не так :(</h1>
          <p>
            В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
          </p>
        </section>
      );
    }
    // если всё работает штатно, рендерим дочерние компоненты
    // @ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;
