import { Card, CardContent, H5, Subtitle2 } from 'ui-neumorphism'

const Wave = ({wave}) => {
  return (
    <Card
      style={{
      marginTop: "16px",
    }}>
      <CardContent>
        <H5>
          {wave.message}
        </H5>
        <Subtitle2>
          From: <a href={`https://sepolia.etherscan.io/address/${wave.address}`} target="_blank" rel="noopener noreferrer">
                  {wave.address}
                </a>
        </Subtitle2>
        <Subtitle2>{wave.timestamp.toString()}</Subtitle2>
      </CardContent>
    </Card>
  );
};

export const WavesList = ({waves}) => {
    return (
      <div style={{
        marginTop: "20px",
      }}>
        <h2>Waves</h2>
        {waves
        .slice(0)
        .reverse()
        .map((wave, index) => {
          return (
            <Wave key={index} wave={wave}/>
          );
        })}
      </div>
    );
};