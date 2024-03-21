# Tennis Game Manager cases

Test suites to unit test and verify rules on different score combinations -

1. **Regular Game**
   - *0-0* - In Progress
   - *0-2* - In Progress
   - *2-0* - In Progress
   - *0-4* - Player 2 wins
   - *0-5* - ERROR (case not possible)
   - *4-4* - Deuce (40-40)
   - *5-6* - Advantage to Player 2
   - *10-10* - Deuce (40-40)
   - *10-11* - Advantage to Player 2
   - *10-12* - Player 2 wins
   - *10-13* - ERROR (case not possible)
   - *4-0* - Player 1 wins
   - *6-5* - Advantage to Player 1
   - *8-7* - Advantage to Player 1
   - *9-7* - Player 1 wins
   - *10-7* - ERROR (case not possible)

2. **Tie-breaker Game**
   - *0-0* - In Progress
   - *0-1* - In Progress
   - *0-3* - In Progress
   - *0-6* - In Progress
   - *0-7* - Player 2 wins
   - *6-7* - In Progress
   - *6-8* - Player 2 wins
   - *7-7* - In Progress
   - *9-9* - In Progress
   - *9-12* - ERROR (case not possible)
   - *1-0* - In Progress
   - *3-0* - In Progress
   - *6-0* - In Progress
   - *7-6* - In Progress
   - *8-6* - Player 1 wins
   - *9-6* - ERROR (case not possible)

3. **Set**
   - *8-8* - ERROR (case not possible)
   - *0-8* - ERROR (case not possible)
   - *8-0* - ERROR (case not possible)
   - *0-0* - In Progress
   - *0-1* - In Progress
   - *0-3* - In Progress
   - *0-6* - In Progress
   - *0-7* - ERROR (case not possible)
   - *5-7* - Player 2 wins
   - *6-6* - Tie breaker
   - *1-0* - In Progress
   - *3-0* - In Progress
   - *6-0* - Player 1 wins
   - *7-0* - ERROR (case not possible)
   - *6-7* - Player 2 wins
   - *7-6* - Player 1 wins

4. **Match (3 sets - 2 sets required to win)**
   - *0-0* - In Progress
   - *0-1* - In Progress
   - *0-2* - Player 2 wins
   - *1-1* - In Progress
   - *1-2* - Player 2 wins
   - *2-1* - Player 1 wins
   - *2-0* - Player 1 wins
   - *3-3* - ERROR (case not possible)
   - *3-0* - ERROR (case not possible)
   - *0-3* - ERROR (case not possible)

5. **Match (5 sets - 3 sets required to win)**
   - *0-0* - In Progress
   - *0-1* - In Progress
   - *0-3* - Player 2 wins
   - *1-1* - In Progress
   - *1-2* - In Progress
   - *1-3* - Player 2 wins
   - *2-1* - In Progress
   - *2-0* - In Progress
   - *2-3* - Player 2 wins
   - *3-2* - Player 1 wins
   - *3-3* - ERROR (case not possible)
   - *3-0* - Player 1 wins
   - *0-4* - ERROR (case not possible)
   - *4-0* - ERROR (case not possible)
