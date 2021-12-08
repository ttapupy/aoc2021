base_name = '7'
pos = File.read("./#{base_name}.txt", chomp: true).split(',').map(&:to_i)

def smallest_dist(pos)
  dist = 0
  (pos.min..pos.max).each do |pos_val|
    fuel = pos.inject(0) do |sum, n|
      # sum + (n - pos_val).abs # part1
      sum + (1..(n - pos_val).abs).sum
    end
    if dist > 0
      dist = [fuel, dist].min
    else
      dist = 1 * fuel
    end
  end
  dist
end

puts smallest_dist(pos)

