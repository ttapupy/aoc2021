require 'set'

base_name = '8'
signals = File.readlines("./#{base_name}.txt", chomp: true).map do |line| 
  a, b = line.split('|')
  {digits: a.split(' '), output: b.split(' ')}
end  

puts signals[0][:output]

def digit_counter(digits)
  count = 0
  digits.each do |digit|
    if [2,3,4,7].include? Set.new(digit.chars).size
      count+=1
    end
  end
  count
end

res = signals.inject(0) do |count, s|
  count + digit_counter(s[:output])
end

puts res