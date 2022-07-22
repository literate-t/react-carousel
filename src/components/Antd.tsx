import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Antd = () => {
  return (
    <Carousel style={{ width: 300 }}>
      <div>
        <h3 style={contentStyle}>aaa</h3>
      </div>
      <div>
        <h3 style={contentStyle}>bbb</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};

export default Antd;
