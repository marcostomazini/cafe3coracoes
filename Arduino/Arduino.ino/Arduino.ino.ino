#include <UIPEthernet.h>
#include <PubSubClient.h>
#include <LiquidCrystal.h>

// Update these with values suitable for your network.
byte mac[6]    = {  
  0xDE, 0xED, 0xBA, 0xFE, 0xFE, 0xED };
  
const char* MQTT_SERVER = "192.168.0.7";
EthernetClient ethClient;
PubSubClient client(ethClient);
boolean botao = 8; 

LiquidCrystal lcd(7, 6, 5, 4, 3, 2);

String user ="CafeDuino 2016";
String msg = "Aguardando o pedido,";

void callback(char* topic, byte* payload, unsigned int length) {  
//  for (int i = 0; i < length; i++) {
//    Serial.print((char)payload[i]);   
//    msg = msg + (char)payload[i];
//  }
//
//  Serial.println();

  lcd.setCursor(0, 1);
  lcd.print("Preparando o cafe, aguarde!");
  msg = "Aguardando o pedido,";
  
  Serial.println(msg);  
  delay(5000);
}

void setup()
{
  Serial.begin(9600);
  Ethernet.begin(mac);
  lcd.begin(16,2);
  pinMode ( botao , INPUT_PULLUP); 

  client.setServer(MQTT_SERVER, 1883);
  client.setCallback(callback);
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    // Attempt to connect
    if (client.connect("ARDUINAO")) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("teste", "arduino conectado");
      // ... and resubscribe
      client.subscribe("teste");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void loop()
{
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
    
  unsigned int i=0;
  // set the cursor to (0,0):
  lcd.setCursor(0, 0);

  while(user[i]!='\0'){
    lcd.print(user[i]);

    if(i>=14)
    {
      lcd.command(0x18); //Scrolling text to Right
    }
    delay(200);
    i++;
  } 

  unsigned int j=0;
  // set the cursor to (0,0):
  lcd.setCursor(0, 1);

  while(msg[j]!='\0'){
    lcd.print(msg[j]);

    if(j>=14)
    {
      lcd.command(0x18); //Scrolling text to Right
    }
    delay(200);
    j++;
  } 
  // clear screen for the next loop:
  lcd.clear();
  Serial.print('limpou lcd');

  // MQTT client loop processing
  client.loop();
}



