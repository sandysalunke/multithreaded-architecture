# Multithreaded Architecture
Multithreaded Architecture using sockets

This project has three different node processes/workers mentioned below.
1. FSM
2. trades_provider
3. client

This project uses below datatypes, data sctuctutes and JS features
- Array
- Object
- timer
- Promise

Communication within these three processes/workers happens over socket.

In order to execute this project in linux environment, you need to perform below mentioned steps.
1. Nevigate to FSM directory in your file system and right click to open in terminal 
2. Ececute "node index" command from terminal -> It should start "FSM" process which is a feature served.
3. Nevigate to client directory in your file system and right click to open in terminal 
4. Ececute "node index" command from terminal -> It should start "client" process 
5. Nevigate to trades_provider directory in your file system and right click to open in terminal 
6. Ececute "node index" command from terminal -> It should start "trades_provider" process 

Note: The sequence to execute these processes is exactly as mentioned in steps above.

Output: Can be seen on console of the client process.

## Prerequisites:
1. The 15-second bar starts on the first trade, and maintains the bar_num series.
2. Every bar is identified by its bar_num attribute, starting at 1, and incrementing.
3. The 15-second bar closes upon the expiration of the bar-interval.
4. The next 15-second bar starts with bar_num++ as its identifier.
5. Don't wait for the next trade to start the next bar.
6. Empty bars can be found during a 15 second interval.
7. OHLC is sent when the bar closes.
8. c (close) is the last traded value during the 15 sec bar.
9. OHLC for trades is grouped and calculated based on the trade symbol.
10. Volume denotes the total quantity traded within the 15 sec bar.
11. Reads trades line by line from trades.json file and put into the buffer.
l2. Sends trades with the interval of 200 MS so that client will keep getting bars. Because, the time required to read all trades is less than 15 seconds and hence client gets only one bar chart for all trades at once.
