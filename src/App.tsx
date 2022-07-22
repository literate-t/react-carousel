import Carousel from './components/Carousel';

function App() {
  return (
    <div>
      {/* loop={true}와 동일 */}
      <Carousel
        loop
        autoLoop
        autoTime={2000}
        transitionTime={1200}
        direction="column"
      >
        <h1>hello</h1>
        <h1>world</h1>
        <h1>react</h1>
        <h1>vue</h1>
        <h1>nextjs</h1>
      </Carousel>
    </div>
  );
}

export default App;
