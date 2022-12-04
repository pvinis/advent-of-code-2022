(defn parse [xs]
  (map #(Integer/parseInt %) xs))

(defn calc-score [scores opponent us]
  (let [points-from-result (scores us)
        points-from-play (case us
                           "X" ;; lose
                           (scores (case opponent
                                     "A" "C"
                                     "B" "A"
                                     "C" "B"))
                           "Y" ;; draw
                           (scores opponent)
                           "Z" ;; win
                           (scores (case opponent
                                     "A" "B"
                                     "B" "C"
                                     "C" "A")))]
    (+ points-from-play points-from-result)))

(let [input (slurp "input-1.txt")
      scores {"A" 1 "B" 2 "C" 3 "X" 0 "Y" 3 "Z" 6}]
  (as-> input v
    (str/split v #"\n") ;; split into lines
    (map #(str/split % #" ") v)
    (map #(calc-score scores (first %) (second %)) v)
    (reduce + v)
    (println v)))
