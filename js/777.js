Initial mode:                   0777(8) = 111111111(2) // user r/w/x, group r/w/x, other r/w/x
Process mask:                    022(8) = 000010010(2)
Reversed process mask:          0755(8) = 111101101(2) // user r/w/x, group r/x,   other r/x
Initial mode AND reversed mask: 0755(8) = 111101101(2) // user r/w/x, group r/x,   other r/x