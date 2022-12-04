(defn parse [xs]
  (map #(Integer/parseInt %) xs))

(defn calc-score [scores opponent us]
  (let [points-from-play (scores us)
        points-from-result (cond
                             (= (scores opponent) (scores us)) (scores :draw)
                             (or (and (= us "X") (= opponent "C"))
                                 (and (= us "Y") (= opponent "A"))
                                 (and (= us "Z") (= opponent "B"))) (scores :win)
                             :else (scores :lose))]
    (+ points-from-play points-from-result)))

(let [input (slurp "input-1.txt")
      scores {"A" 1 "B" 2 "C" 3 "X" 1 "Y" 2 "Z" 3 :win 6 :draw 3 :lose 0}]
  (as-> input v
    (str/split v #"\n") ;; split into lines
    (map #(str/split % #" ") v)
    (map #(calc-score scores (first %) (second %)) v)
    (reduce + v)
    (println v)))
