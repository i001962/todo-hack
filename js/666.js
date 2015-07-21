Initial mode:                   0666(8) = 110110110(2) // user r/w,   group r/w, other r/w
Process mask:                    022(8) = 000010010(2)
Reversed process mask:          0755(8) = 111101101(2) // user r/w/x, group r/x, other r/x
Initial mode AND reversed mask: 0644(8) = 110100100(2) // user r/w,   group r,   other r